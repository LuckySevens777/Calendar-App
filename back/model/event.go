package model

import "github.com/jinzhu/gorm"

type Event struct {
	gorm.Model

	UserID uint
	Day    string
	Slots  []*Timeslot `gorm:"many2many:event_times;"`
}
