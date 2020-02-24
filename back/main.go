package main

import (
	"github.com/thecsw/Calendar-App/back/api"
	"github.com/thecsw/Calendar-App/back/processing"
	"os"
	"fmt"
)

func main() {
	fmt.Println("Hello world!")

	err := processing.DbInit()

	if err != nil {
		fmt.Println("DB unable to be initialized.")
		os.Exit(3)
	}
	
	api.HandleRequests()
}
