package main

import (
	"fmt"
	"os"

	"github.com/thecsw/Calendar-App/back/api"
	"github.com/thecsw/Calendar-App/back/processing"
)

func main() {
	fmt.Println("Hello world!")

	err := processing.DbInit()

	fmt.Println("Got the DB connection")
	if err != nil {
		fmt.Println("DB unable to be initialized.")
		os.Exit(3)
	}

	api.HandleRequests()
}
