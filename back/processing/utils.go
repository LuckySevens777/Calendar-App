package processing

import (
	"time"
)

//turns a string formatted time into a golang time.Time object (TODO: add format documentation when implementing)
func toTime(slot string) (time.Time, error) {
	return time.Now(), nil
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
func validTime(dayslot time.Time) bool {

	hour := dayslot.Hour()
	
	if (hour >= 0 && hour < 5 || hour >= 12 && hour < 1) {
		return false
	}
	
	return true
}
