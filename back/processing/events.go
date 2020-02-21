package processing

import (
	"github.com/thecsw/Calendar-App/back/model"
	"net/http" //should move this functionality to API when given chance
	"errors"
	"strings"
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

//Handles turning incoming header info into an action.  Should be moved to API eventually.
//No authentication is done on this other than making sure the action is valid 
//(and has all its pieces).  Will throw an error if the request is invalid.
func HandleRequest(args http.Header) (string, error) {
	user := args.Get("User")
	
	if user == "" {
		return "", errors.New("No user specified in header")
	}
	
	action := args.Get("Action")
	
	timeKey := http.CanonicalHeaderKey("Times")
	eventKey := http.CanonicalHeaderKey("Event-Name")
	
	times, errTimes := args[timeKey]
	eventName, errEventName := args[eventKey]
	if len(eventName) == 0 {
		errEventName = false
	}

	switch action {
	case "Create-Event":
		
		if !errTimes {
			return "", errors.New("Header doesn't contain the '" + timeKey + "' key")
		}
		
		//err := CreateEvent(user, times)
		
		//if err != nil {
		//	return "", err
		//}
		
		return "OK", nil
	case "Get-Events":
		
		if !errTimes {
			return "", errors.New("Header doesn't contain the '" + timeKey + "' key")
		}
		
		return GetEvents(user, times), nil
	case "Get-Attendees":
		
		if !errEventName {
			return "", errors.New("Header doesn't contain the '" + eventKey + "' key")
		}
		
		end, err := GetAttendees(user, eventName[0])
		
		return strings.Join(end,","), err
	case "Register-For-Event":
		
		if !errTimes || !errEventName {
			return "", errors.New("Header doesn't contain both of the '" + eventKey + "," + timeKey + "' keys")
		}
		
		err := RegisterForEvent(user, eventName[0], times)
		
		if err != nil {
			return "", err
		}
		
		return "OK", nil
	default:
		return "", errors.New("No action selected")
	}
}

//creates an event on the given day over the given timeslots made by the given user. 
//Throws errors and performs no db action when any of the timeslots are invalid 
//(but doesn't check that the user is valid).
func CreateEvent(creator string, day string, times []string) error {
	/*
	if len(times) == 0 {
		return errors.New("Can't make an event without timeslots!")
	}
	
	//obtain the validated timeslots corresponding to input (checks date and slots):
	slots,err := toValidTimeSlots(times)
	if err != nil {
		return errors.New("Problem parsing times: " + err.Error())
	}
	
	//put event in db
	//_,err = model.CreateEvent(creator, day, slots)
	if err != nil {
		return errors.New("Problem adding event to db: " + err.Error())
	}
	*/
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
