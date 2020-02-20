package model

import (
	"strings"

	"github.com/jinzhu/gorm"
)

// GetAllTimeslots returns all timeslots in the system
func GetAllTimeslots() ([]Timeslot, error) {
	result := make([]Timeslot, 0, 64)
	return result, DB().Model(&Timeslot{}).Find(&result).Error
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
/* func CreateEvent(creator, day string, timeslots []uint) (*Event, error) {
	user, err := GetUser(creator)
	if err != nil {
		return nil, err
	}
	event := &Event{UserID: user.ID, Day: day}
	err = DB().Create(event).Error
	if err != nil {
		return nil, err
	}
	for _, v := range timeslots {
		temp := &Timeslot{}
		temp.ID = v
		DB().Model(event).Association(DB().NewScope(Timeslot{}).TableName()).Append()
	}
	return event, nil
	 	return event, DB().
	Model(event).
	Association(DB().NewScope(Timeslot{}).TableName()).
	Append(timeslots).Error
}
*/
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
		Related(&timeslots, DB().NewScope(&Timeslot{}).TableName()).
		Error
}

/*
// AddAttendee adds an attendance
func AddAttendee(eventID, userID uint, timeslots []uint) {
	for _, v := range timeslots {
		obj := &Attendee{
			EventID:    eventID,
			UserID:     userID,
			TimeslotID: v,
		}
		DB().Create(obj)
	}
}
*/
// DB just return the database access model
func DB() *gorm.DB {
	return db
}
