package model

import "github.com/jinzhu/gorm"

type Timeslot struct {
	gorm.Model

	Name   string
	Events []*Event `gorm:"many2many:event_times;"`
}
