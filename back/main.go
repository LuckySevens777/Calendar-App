package main

import (
	"github.com/thecsw/Calendar-App/back/processing"
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
	"errors"
)

type data struct {
	User string `json:"User"`
	Action string `json:"Action"`
	Day string `json:"Day"`
	Times []string `json:"Times"`
	Event_Name string `json:"Event_Name"`
	Event_Description string `json:"Event_Description"`
}

type return_data struct {
	Message string `json:"Message"`
	Attendee_Names []string `json:"Attendee_Names"`
	Event_Info []map[string]string `json:"Event_Info"`
	Timeslots [][]string `json:"Timeslots"`
}

func apicall(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Hello World!")

	var Data data

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	json.Unmarshal(reqBody, &Data)

	fmt.Println(Data.User)
	fmt.Println(Data.Action)
	fmt.Println(Data.Day)
	fmt.Println(Data.Times)
	fmt.Println(Data.Event_Name)
	fmt.Println(Data.Event_Description)

	new_data, err := HandleRequest(Data)

	if err != nil {
		fmt.Println(err)
		fmt.Println("Help!")
	}

	json.NewEncoder(w).Encode(new_data)
}

//No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
func HandleRequest(Data data) (return_data, error) {
	user := Data.User
	
	action := Data.Action

	day := Data.Day
	times := Data.Times
	eventName := Data.Event_Name
	eventDescription := Data.Event_Description

	switch action {
	case "Create-Event":
		err := processing.CreateEvent(user, eventName, eventDescription, day, times)
		
		if err != nil {
			return return_data{}, err
		}
		
		return return_data{}, nil
		
	case "Get-Events":
		var return_this return_data
		event_info, timeslots := processing.GetEvents(eventName, user, "", []string{day})
		return_this.Message = "OK"
		return_this.Event_Info = event_info
		return_this.Timeslots = timeslots
		return return_this, nil
		
	case "Get-Attendees":
		var return_this return_data
		attendees, timeslots, err := processing.GetAttendees("")
		if err != nil {
			return return_data{}, err
		}

		return_this.Message = "OK"
		return_this.Attendee_Names = attendees
		return_this.Timeslots = timeslots
		
		return return_this, nil
		
	case "Register-For-Event":
		var return_this return_data
		
		err := processing.RegisterForEvent(user, eventName, times)
		
		if err != nil {
			return return_data{}, err
		}

		return_this.Message = "OK"

		return return_this, nil
		
	default:
		return return_data{}, errors.New("No action selected")
	}
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	
	myRouter.HandleFunc("/", apicall).Methods("POST")
	
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}


func main() {
	fmt.Println("Hello world!")

	handleRequests()
}
