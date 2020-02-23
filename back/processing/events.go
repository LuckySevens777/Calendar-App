package processing

import (
	"github.com/thecsw/Calendar-App/back/model"
	"net/http" //should move this functionality to API when given chance
	"errors"
	"strings"
	//"time"
)

//Initializes the database
func DbInit() error {
	err := model.Init()
	return err
}

//Handles turning incoming header info into an action.  Should be moved to API eventually.  No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
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
		
		err := CreateEvent(user, times)
		
		if err != nil {
			return "", err
		}
		
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

//creates an event on the given day over the given timeslots. Throws errors and performs no db action when any of the timeslots are invalid.
func CreateEvent(creator string, times []string) error {
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
