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

	model.CreateTimeslot("12:00")
	model.CreateTimeslot("12:30")
	model.CreateTimeslot("13:00")
	model.CreateTimeslot("13:30")

	model.CreateUser("Sandy")
	model.CreateUser("Jonanathan")
	model.CreateUser("Dylan")

	res, err := model.GetAllTimeslots()
	fmt.Println(res, err)

	//fmt.Println(model.CreateEvent("Sandy", "2020-02-17", []uint{0, 1}))
}
