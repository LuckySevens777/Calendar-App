package main

import (
	"fmt"

	"github.com/thecsw/Calendar-App/back/model"
)

func main() {
	err := model.Init()
	fmt.Println(err)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to the database!")

	sandy, _ := model.CreateUser("Sandy")
	jonathan, _ := model.CreateUser("Jonathan")

	time1, _ := model.CreateTimeslot("12:00")
	time2, _ := model.CreateTimeslot("12:20")
	time3, _ := model.CreateTimeslot("12:40")

	event, _ := model.CreateEvent(sandy.Name, "2020-02-20", "Test event", []model.Timeslot{*time1, *time2, *time3})

	//times, _ := model.GetEventTimeslots(event.ID)

	model.AddAttendee(event.ID, jonathan.ID, []model.Timeslot{*time1, *time2})

	attendees, _ := model.GetEventAttendees(event.ID)
	fmt.Println(attendees)
	for _, v := range attendees {
		times, _ := model.GetAttendeeTimeslots(v.ID)
		fmt.Println(times)
	}
}
