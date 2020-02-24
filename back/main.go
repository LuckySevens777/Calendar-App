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
	"os"
)
// data stores all the possible data that should come in from the front end.
// Includes the name of the user, the action they want to take, the day they're looking at, the possible timeslots (for registration purposes),
// the event name, and the event description
type data struct {
	User string `json:"User"`
	Action string `json:"Action"`
	Day string `json:"Day"`
	Times []string `json:"Times"`
	Event_Name string `json:"Event_Name"`
	Event_Description string `json:"Event_Description"`
	Event_ID string `json:"Event_ID"`
}

// return_data stores all the possible data that could be returned to the front end.
// Includes a simple message for the front end to check, and the result of the get_attendees and get_event methods
type return_data struct {
	Message string `json:"Message"`
	Attendee_Names []string `json:"Attendee_Names"`
	Event_Info []map[string]string `json:"Event_Info"`
	Timeslots [][]string `json:"Timeslots"`
}

//apicall parses the data obtained from the front-end into the data struct, then sends the data into the handle method
func apicall(w http.ResponseWriter, r *http.Request){
	var Data data

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Data entered is invalid")
	}

	json.Unmarshal(reqBody, &Data)

	//For observation purposes
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
	eventID := Data.Event_ID

	switch action {
	case "Create-Event":
		var return_this return_data
		err := processing.CreateEvent(user, eventName, eventDescription, day, times)
		
		if err != nil {
			return return_data{}, err
		}

		return_this.Message = "OK"
		return return_this, nil
		
	case "Get-Events":
		var return_this return_data
		event_info, timeslots := processing.GetEvents(eventName, user, eventID, []string{day})
		return_this.Message = "OK"
		return_this.Event_Info = event_info
		return_this.Timeslots = timeslots
		return return_this, nil
		
	case "Get-Attendees":
		var return_this return_data
		attendees, timeslots, err := processing.GetAttendees(eventID)
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
	case "Sign-Up":
		var return_this return_data

		err := processing.SignUp(user)
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

	err := processing.DbInit()

	if err != nil {
		fmt.Println("DB unable to be initialized.")
		os.Exit(3)
	}
	
	handleRequests()
}
