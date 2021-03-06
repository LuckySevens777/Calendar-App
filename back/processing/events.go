// Processing dictates the actual logic of Calendar-App
package processing

import (
	"errors"
	"fmt"
	"strconv"
	"time"

	"github.com/thecsw/Calendar-App/back/model"
)

// DbInit Initializes the database
func DbInit() error {
	//connect to db:
	err := model.Init()
	if err != nil {
		return err
	}

	// check if this is first start up of the db:
	// (by checking for entries in the timeslot table)
	slots, err := model.GetAllTimeslots()
	if err != nil {
		return err
	}
	if len(slots) == 0 {
		//no entries is a problem:
		var zero time.Time
		increment, err := time.ParseDuration("20m")
		if err != nil {
			fmt.Println("Error parsing '20m' duration")
			return nil
		}
		for i := 0; i < 72; i++ {
			model.CreateTimeslot(zero.Format("15:04"))
			zero = zero.Add(increment)
		}
	}

	return nil
}

// DbClose closes the database
func DbClose() error {
	err := model.Close()
	return err
}

// CreateEvent Throws errors and performs no db action when any of the timeslots are invalid
//	creates an event on the given day over the given timeslots made by the given user.
//	creator must be an existing user
//	name, desc have no specific restrictions
//	day must be a valid day (format: "02-21-2020")
//	times must be valid timeslots (format: "08:20")
// Currently assumes the front end will ask for events again to get the eventID
func CreateEvent(creator string, name string, desc string, day string, times []string) error {

	if len(times) == 0 {
		return errors.New("Can't make an event without a time")
	}

	// make sure the day is a valid one:
	if !validDay(day) {
		return errors.New("Problem parsing day: " + day)
	}

	// obtain the validated timeslots corresponding to input (checks date and slots):
	slots, err := toValidTimeSlots(times)
	if err != nil {
		return errors.New("Problem parsing times: " + err.Error())
	}

	// put the event in the db (model checks that user exists in db)
	event, err := model.CreateEvent(creator, day, name, desc, slots)
	if err != nil {
		return errors.New("Problem adding event to db: " + err.Error())
	}

	return RegisterForEvent(creator, strconv.FormatUint(uint64(event.ID), 10), times) //creator signs up for all timeslots of event?
}

// GetAttendees validates that the event exists, then returns a list of usernames of users
// attending the event and the timeslots they are signed up for
// (each index of the two lists corresponds to the same user)
func GetAttendees(eventID string) ([]string, [][]string, error) {
	id, err := validateEventID(eventID)
	if err != nil {
		return nil, nil, errors.New("Error parsing eventID: " + err.Error())
	}
	attendees, err := model.GetEventAttendees(id)
	if err != nil {
		return nil, nil, errors.New("Error getting event attendees from db: " + err.Error())
	}
	// get the usernames:
	names := make([]string, len(attendees))
	for i, elem := range attendees {
		names[i], err = getUser(elem.UserID)
		if err != nil {
			return nil, nil, err
		}
	}
	// get the timeslots:
	slots := make([][]string, len(attendees))
	for i, elem := range attendees {
		timeslots, err := model.GetAttendeeTimeslots(elem.ID)
		if err != nil {
			return nil, nil, err
		}
		slots[i] = make([]string, len(timeslots))
		for l, slt := range timeslots {
			slots[i][l] = slt.Name
		}
	}
	return names, slots, nil
}

// GetEvents gets all events with specific criteria.  Leave the criterion zeroed/nil to not search on it.
//	return format: returns a pair of lists of same size
//	a list of maps mapping:
//		"Name" to event name
//		"Description" to event description
//		"EventID" to unique event id
//		"Creator" to event creator's name
//		"Day" to the event's day
//	and a list of a list of timeslots
//	(each distinct index of the two lists corresponds to the same event)
func GetEvents(name, creator, attendee string, days []string) ([]map[string]string, [][]string) {
	events, err := model.GetAllEvents()
	if err != nil {
		return nil, nil
	}
	skpd := 0 //number of events skipped over in search (using continue)
	endmap := make([]map[string]string, len(events))
	endslots := make([][]string, len(events))
	for i, elem := range events {
		crtr, err := getUser(elem.UserID)
		if err != nil {
			return nil, nil
		}

		//make sure event fits the filters:
		if (name != "" && elem.Title != name) || (creator != "" && crtr != creator) {
			skpd++
			continue
		}
		//check attendee:
		if attendee != "" {
			atts, _, err := GetAttendees(strconv.FormatUint(uint64(elem.ID), 10))
			if err != nil {
				return nil, nil //worse problems are occurring
			}
			ok := false
			for _, att := range atts {
				if attendee == att {
					ok = true
					break
				}
			}
			if !ok {
				skpd++
				continue
			}
		}
		//check days:
		if len(days) != 0 {
			dayOk := false
			for _, day := range days {
				if elem.Day == day {
					dayOk = true
					break
				}
			}
			if !dayOk {
				skpd++
				continue
			}
		}

		cind := i - skpd

		//fill out info for the event:
		endmap[cind] = make(map[string]string)
		endmap[cind]["Name"] = elem.Title
		endmap[cind]["Description"] = elem.Description
		endmap[cind]["EventID"] = strconv.FormatUint(uint64(elem.ID), 10)
		endmap[cind]["Creator"] = crtr
		endmap[cind]["Day"] = elem.Day

		//fill in slots for the event:
		slots, err := model.GetEventTimeslots(elem.ID)
		if err != nil {
			return nil, nil //worse problems are occurring
		}
		endslots[cind] = make([]string, len(slots))
		for p, slot := range slots {
			endslots[cind][p] = slot.Name
		}
	}
	endmap = endmap[0:(len(events) - skpd)]
	endslots = endslots[0:(len(events) - skpd)]
	return endmap, endslots
}

// RegisterForEvent validates that the event exists, that the user is in the db,
//and that all the times are valid (both valid timeslots and linked to the event).
//If anything is invalid, no action will be taken.
//remember: valid format for times is "08:40" or "18:00"
func RegisterForEvent(username string, eventID string, times []string) error {
	usr, err := model.GetUser(username)
	if err != nil {
		return errors.New("Problem finding user in db: " + err.Error())
	}
	evntID, err := validateEventID(eventID)
	if err != nil {
		return err
	}
	slots, err := toValidTimeSlots(times)
	if err != nil {
		return err
	}
	//check that the timeslots match up to the event:
	eventsSlots, err := model.GetEventTimeslots(evntID)
	if err != nil {
		return errors.New("Problem getting timeslots for event: " + err.Error())
	}
	for _, elem := range slots {
		ok := false
		for _, elem2 := range eventsSlots {
			if elem.ID == elem2.ID {
				ok = true
				break
			}
		}
		if !ok {
			return errors.New("One of the timeslots isn't in the event: " + elem.Name)
		}
	}
	_, err = model.AddAttendee(evntID, usr.ID, slots)
	return err
}

// SignUp Adds the username given to the database if the user
//does not already exist. If the user does exist, throw an error
func SignUp(username string) error {
	_, err := model.GetUser(username)
	if err == nil {
		return errors.New("User already exists in db")
	}
	_, err2 := model.CreateUser(username)
	return err2
}
