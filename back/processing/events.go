package processing

import (
	"github.com/LuckySevens777/Calendar-App/back/model"
	"net/http" //should move this functionality to API when given chance
	//"time"
)

//Initializes the database
func DbInit() error {
	err := model.Init()
	return err
}

//Handles turning incoming header info into an action.  Should be moved to API eventually.  No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
func HandleRequest(args http.Header) (string, error) {
	
	return "",nil
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
