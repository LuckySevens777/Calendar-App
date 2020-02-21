package model

import "github.com/jinzhu/gorm"

// User struct defines a user model
type User struct {
	gorm.Model

	Name   string `gorm:"unique"`
	Events []Event
}
