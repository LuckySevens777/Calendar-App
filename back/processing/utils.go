package processing

import (
	"time"
	"errors"
	"github.com/LuckySevens777/Calendar-App/back/model"
)

//turns a list of string formatted times into a timeslot 
// (checks that it is possible for it to be a valid timeslot)
func toValidTimeSlots(times []string) ([]model.Timeslot, error) {
	slots,err := model.GetAllTimeslots()
	if err != nil {
		return nil, err
	}
	
	//make small lookuptable
	lookup := make(map[string]int)
	for i,elem := range(slots) {
		lookup[elem.Name] = i
	}
	
	end := make([]model.Timeslot, len(times))
	for i,elem := range(times) {
		//Make sure the time fits into a time object (validating formatting):
		_,err := time.Parse("15:04",elem)
		if err != nil {
			return nil, errors.New("Unrecognized time: " + elem + ", err: " + err.Error())
		}
		//find what index timeslot this time should have:
		ind,ok := lookup[elem]
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

//checks that the given day is a valid one (not nonsensical or December 25, July 4 or January 1)
func validDay(date time.Time) bool {
	//assuming time.Time rules out nonsensical dates (so I guess API handles that check)
	
	_, month, day := date.Date()
	
	if ((month == time.December && day == 25) || (month==time.July && day==4) || (month==time.January && day==1)) {
		return false
	}
	
	return true
}

//checks that the given time is not in [12am,5am) and [12pm,1pm)
func validTime(potentialslot string) bool {

	slot,err := time.Parse("15:04",potentialslot)
	if err != nil {
		return false
	}
	hour := slot.Hour()
	
	if (hour >= 0 && hour < 5 || hour >= 12 && hour < 1) {
		return false
	}
	
	return true
}
