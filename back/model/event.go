package model

import "github.com/jinzhu/gorm"

// Event defines an Event struct that defines events
type Event struct {
	gorm.Model

	UserID      uint
	Day         string
	Title       string
	Description string
	Timeslots   []*Timeslot `gorm:"many2many:event_times;"`
}
