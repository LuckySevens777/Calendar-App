package model

import "github.com/jinzhu/gorm"

type Attendee struct {
	gorm.Model

	UserID     uint
	EventID    uint
	TimeslotID uint
}
