package processing

import (
	"github.com/thecsw/Calendar-App/back/model"
	"errors"
	"time"
	"fmt"
)

//Initializes the database
func DbInit() error {
	//connect to db:
	err := model.Init()
	if err != nil {
		return err
	}

	//check if this is first start up of the db: 
	//(by checking for entries in the timeslot table)
	slots,err := model.GetAllTimeslots()
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
		for i:=0; i < 72; i++ {
			model.CreateTimeslot(zero.Format("15:04"))
			zero = zero.Add(increment)
		}
	}

	return nil
}

//closes the database
func DbClose() error {
	err := model.Close()
	return err
}

//Throws errors and performs no db action when any of the timeslots are invalid 
//creates an event on the given day over the given timeslots made by the given user. 
//(but doesn't check that the user is valid).
//	creator must be a valid user
//	name,desc have no specific restrictions
//	day must be a valid day (format: "")
//	times must be valid timeslots (format: "15:04")
//Currently assumes the front end will ask for events again to get the eventID
func CreateEvent(creator string, name string, desc string, day string, times []string) error {
	
	if len(times) == 0 {
		return errors.New("Can't make an event without a time!")
	}
	
	//make sure the day is a valid one:
	if !validDay(day) {
		return errors.New("Problem parsing day: " + day)
	}
	
	//obtain the validated timeslots corresponding to input (checks date and slots):
	slots,err := toValidTimeSlots(times)
	if err != nil {
		return errors.New("Problem parsing times: " + err.Error())
	}
	
	//put the event in the db
	_,err = model.CreateEvent(creator, day, desc, slots)
	if err != nil {
		return errors.New("Problem adding event to db: " + err.Error())
	}
	
	return nil
}

//gets all events for a specific day or days
func GetEvents(user string, days []string) string {
	//need to plan out return format
	return ""
}

//validates that the user asking is the creator of the event and the event exists, then returns a list of users attending the event
func GetAttendees(user string, eventName string) ([]string, error) {
	//user := model.getUser(key)
	//checking user is valid...
	//check if user returned by db is creator of the event they are trying to access...
	//model.GetEvents(user)
	return nil, nil
}

//validates that the event exists, the user is in the db, and that all the times are valid times.  If anything is invalid, no action will be taken (maybe change later?).
func RegisterForEvent(user string, eventName string, times []string) error {
	return nil
}
