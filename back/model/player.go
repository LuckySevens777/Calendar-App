package model

import (
	"strings"

	"github.com/jinzhu/gorm"
)

// GetAllTimeslots returns all timeslots in the system
func GetAllTimeslots() ([]Timeslot, error) {
	result := make([]Timeslot, 0, 72)
	return result, DB().Model(&Timeslot{}).Find(&result).Error
}

// GetAllUsers gets all users
func GetAllUsers() ([]User, error) {
	result := make([]User, 0, 72)
	return result, DB().Model(&User{}).Find(&result).Error
}

// GetAllEvents gets all events
func GetAllEvents() ([]Event, error) {
	result := make([]Event, 0, 72)
	return result, DB().Model(&Event{}).Find(&result).Error
}

// CreateTimeslot creates a timeslot
func CreateTimeslot(name string) (*Timeslot, error) {
	obj := &Timeslot{Name: name}
	return obj, DB().Create(obj).Error
}

// CreateUser creates a user by name
func CreateUser(name string) (*User, error) {
	obj := &User{Name: name}
	return obj, DB().Create(obj).Error
}

// GetUser gets a user by name
func GetUser(name string) (*User, error) {
	user := &User{}
	return user, DB().Model(&User{}).
		Where("LOWER(name)=?", strings.ToLower(name)).
		First(user).Error
}

// CreateEvent creates an even
// Register the day and the user_id of who created this event
// Add an association to timeslots, so event can occupy multiple timeslots
func CreateEvent(creator, day, description string, timeslots []Timeslot) (*Event, error) {
	user, err := GetUser(creator)
	if err != nil {
		return nil, err
	}
	event := &Event{
		UserID:      user.ID,
		Day:         day,
		Description: description,
	}
	err = DB().Create(event).Error
	if err != nil {
		return nil, err
	}
	return event, DB().
		Model(event).Association(TimeslotTable).
		Append(timeslots).
		Error
}

// GetEvents gets all user's events on a specific day
func GetEvents(creator, day string) ([]Event, error) {
	events := make([]Event, 0, 8)
	user, err := GetUser(creator)
	if err != nil {
		return nil, err
	}
	return events, DB().
		Model(&Event{}).
		Where("user_id=?", user.ID).
		Where("day=?", day).
		Find(&events).Error
}

// GetEventTimeslots returns all timeslots occupied by an
// event, where it is being passed as an ID
func GetEventTimeslots(eventID uint) ([]Timeslot, error) {
	timeslots := make([]Timeslot, 0, 16)
	obj := &Event{}
	obj.ID = eventID
	return timeslots, DB().
		Model(obj).
		Related(&timeslots, TimeslotTable).
		Error
}

// GetEventAttendees gives a slice of event's attendees
func GetEventAttendees(eventID uint) ([]Attendee, error) {
	attendees := make([]Attendee, 0, 4)
	return attendees, DB().
		Model(&Attendee{}).
		Where("event_id=?", eventID).
		Find(&attendees).
		Error
}

// GetAttendeeTimeslots gets attendee's timeslots
func GetAttendeeTimeslots(attendeeID uint) ([]Timeslot, error) {
	timeslots := make([]Timeslot, 0, 8)
	attendee := &Attendee{}
	attendee.ID = attendeeID
	return timeslots, DB().
		Model(attendee).
		Related(&timeslots, TimeslotTable).
		Error
}

// AddAttendee adds an attendance
func AddAttendee(eventID, userID uint, timeslots []Timeslot) (*Attendee, error) {
	obj := &Attendee{
		EventID: eventID,
		UserID:  userID,
	}
	err := DB().Create(obj).Error
	if err != nil {
		return nil, err
	}
	return obj, DB().
		Model(obj).Association(TimeslotTable).
		Append(timeslots).
		Error
}

// DB just return the database access model
func DB() *gorm.DB {
	return db
}
