package processing

import (
	"errors"
	"github.com/thecsw/Calendar-App/back/model"
	"strconv"
	"time"
)

//turns a list of string formatted times into a timeslot
// (and checks that it is possible for it to be a valid timeslot)
func toValidTimeSlots(times []string) ([]model.Timeslot, error) {
	slots, err := model.GetAllTimeslots()
	if err != nil {
		return nil, err
	}

	//make small lookuptable
	lookup := make(map[string]int)
	for i, elem := range slots {
		lookup[elem.Name] = i
	}

	end := make([]model.Timeslot, len(times))
	for i, elem := range times {
		//Make sure the time fits into a time object (validating formatting):
		_, err := time.Parse("15:04", elem)
		if err != nil {
			return nil, errors.New("Unrecognized time: " + elem + ", err: " + err.Error())
		}
		//find what index timeslot this time should have:
		ind, ok := lookup[elem]
		if !ok {
			return nil, errors.New("No timeslot matching time: " + elem)
		}

		//check if this timeslot is at a valid time:
		if !validTime(elem) {
			return nil, errors.New("Not a valid timeslot time: " + elem)
		}

		//add this timeslot to the list:
		end[i] = slots[ind]
	}
	return end, nil
}

//checks that the given time is not in [12am,5am) and [12pm,1pm)
func validTime(potentialslot string) bool {

	slot, err := time.Parse("15:04", potentialslot)
	if err != nil {
		return false
	}
	hour := slot.Hour()

	if hour >= 0 && hour < 5 || hour >= 12 && hour < 1 {
		return false
	}

	return true
}

//validates that an input day is valid for making an event on.  (format: "01-02-2006"
//also checks that the given day is a valid one (not nonsensical or December 25, July 4 or January 1)
func validDay(datestr string) bool {
	//let time.Time rule out impossible dates:
	date, err := time.Parse("01-02-2006", datestr)
	if err != nil {
		return false
	}

	_, month, day := date.Date()

	if (month == time.December && day == 25) || (month == time.July && day == 4) || (month == time.January && day == 1) {
		return false
	}

	return true
}

//validates that the given event id corresponds to an existing event, returns that id.
func validateEventID(eventID string) (uint, error) {
	events, err := model.GetAllEvents()
	if err != nil {
		return 0, errors.New("Error getting events: " + err.Error())
	}
	intid, err := strconv.ParseUint(eventID, 10, 64)
	if err != nil {
		return 0, errors.New("Error parsing event into int: " + err.Error())
	}
	for _, elem := range events {
		if elem.ID == uint(intid) {
			return elem.ID, nil
		}
	}

	return 0, errors.New("No event matching the given ID: " + eventID)
}

//returns name of user associated with given userID
func getUser(userID uint) (string, error) {
	users, err := model.GetAllUsers()
	if err != nil {
		return "", errors.New("Problem getting users from db: " + err.Error())
	}
	for _, elem := range users {
		if elem.ID == userID {
			return elem.Name, nil
		}
	}
	return "", errors.New("No user found with id of: " + string(userID))
}
