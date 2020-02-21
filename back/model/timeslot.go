package model

import "github.com/jinzhu/gorm"

const (
	// TimeslotTable is the name of the table
	// for quick referencing
	TimeslotTable = `Timeslots`
)

// Timeslot is a single timeslots
type Timeslot struct {
	gorm.Model

	Name      string      `gorm:"unique"`
	Events    []*Event    `gorm:"many2many:event_times;"`
	Attendees []*Attendee `gorm:"attendees_times;"`
}
