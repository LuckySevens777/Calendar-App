package model

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jinzhu/gorm"
	// We need this for gorm to connect to postgres
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
	db               *gorm.DB
	dbType           = "postgres"
	connectionString = "postgresql://sandy:pass@db:5432/calendar?sslmode=disable"
)

// Init initialized the DB connection
func Init() error {
	var err error
	if os.Getenv("CALENDAR_TEST") == "Yes" {
		connectionString = "postgresql://sandy:pass@localhost:5432/calendar?sslmode=disable"
	}
	db, err = connectDB(connectionString)
	autoMigrate()
	return err
}

// Close closes the current DB connection
func Close() error {
	return db.Close()
}

func connectDB(database string) (*gorm.DB, error) {
	const timeout = 1 * time.Minute
	deadline := time.Now().Add(timeout)
	tries := 0
	for tries = 0; time.Now().Before(deadline); tries++ {
		db, err := gorm.Open(dbType, database)
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
