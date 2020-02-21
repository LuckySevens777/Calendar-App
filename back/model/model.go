package model

import (
	"fmt"
	"log"
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	db *gorm.DB
)

func Init() error {
	var err error
	db, err = connectDB("postgresql://sandy:pass@127.0.0.1:5432/calendar?sslmode=disable")
	autoMigrate()
	return err
}

func connectDB(database string) (*gorm.DB, error) {
	const timeout = 1 * time.Minute
	deadline := time.Now().Add(timeout)
	tries := 0
	for tries = 0; time.Now().Before(deadline); tries++ {
		db, err := gorm.Open("postgres", database)
		if err == nil {
			return db, nil
		}
		log.Printf("Couldn't connect to the database (%s). Retrying...", err.Error())
		time.Sleep(time.Second << uint(tries))
	}
	// Sleep for 2 seconds
	time.Sleep(2 * time.Second)
	return nil, fmt.Errorf("failed connect to the database after %d attempts", tries)
}

func autoMigrate() {
	DB().AutoMigrate(&User{}, &Event{}, &Attendee{}, &Timeslot{})
}
