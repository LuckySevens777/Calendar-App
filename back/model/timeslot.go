package model

import "github.com/jinzhu/gorm"

type Timeslot struct {
	gorm.Model

	Name   string   `gorm:"unique"`
	Events []*Event `gorm:"many2many:event_times;"`
}
