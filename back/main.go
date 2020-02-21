package main

import (
	"fmt"

	"github.com/sanity-io/litter"
	"github.com/thecsw/Calendar-App/back/model"
)

func main() {
	err := model.Init()
	fmt.Println(err)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to the database!")

	model.CreateUser("Sandy")

	time1, _ := model.CreateTimeslot("12:00")
	time2, _ := model.CreateTimeslot("12:20")
	time3, _ := model.CreateTimeslot("12:40")

	event, _ := model.CreateEvent("Sandy", "2020-02-20", []*model.Timeslot{time1, time2, time3})

	times, _ := model.GetEventTimeslots(event.ID)

	litter.Dump(times)
}
