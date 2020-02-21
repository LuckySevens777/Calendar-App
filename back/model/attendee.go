package model

import "github.com/jinzhu/gorm"

// Attendee defines an attendee to an event that visits
// some of the timeslots of the event
type Attendee struct {
	gorm.Model

	UserID    uint
	EventID   uint
	Timeslots []*Timeslot `gorm:"many2many:attendees_times;"`
}
