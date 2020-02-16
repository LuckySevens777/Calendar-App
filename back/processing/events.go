package processing

import (
	//"github.com/LuckySevens777/Calendar-App/back/model"
	"time"
)

//gets all events for a specific day
func GetEvents(user string, day time.Time) string {
	//need plan out return format
	return ""
}

//validates that the user asking is the creator of the event, then returns a list of users attending the event
func GetAttendees(user string, eventName string) ([]string, error) {
	//user := model.getUser(key)
	//checking user is valid...
	//check if user returned by db is creator of the event they are trying to access...
	//model.GetEvents(user)
	return nil, nil
}

func RegisterForEvent(user string, eventName string, dayslot time.Time) error {
	return nil
}
