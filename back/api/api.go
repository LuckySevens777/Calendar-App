package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/thecsw/Calendar-App/back/processing"
	"io/ioutil"
	"log"
	"net/http"
)

// Stores all the possible data that should come in from the front end.
// Includes the name of the user, the action they want to take, the day they're looking at, the possible timeslots (for registration purposes),
// the event name, the event description, and the event ID
// Some of these may be empty, signifying the data is not important
type data struct {
	User              string   `json:"User"`
	Action            string   `json:"Action"`
	Day               string `json:"Day"`
	Times             []string `json:"Times"`
	Event_Name        string   `json:"Event_Name"`
	Event_Description string   `json:"Event_Description"`
	Event_ID          string   `json:"Event_ID"`
}

// Stores all the possible data that could be returned to the front end.
// Includes a simple message for the front end to check, and the result of the get_attendees and get_event methods
type return_data struct {
	Message        string              `json:"Message"`
	Attendee_Names []string            `json:"Attendee_Names"`
	Event_Info     []map[string]string `json:"Event_Info"`
	Timeslots      [][]string          `json:"Timeslots"`
}

//Parses the data obtained from the front-end into the data struct, then sends the data into the handle method
func apicall(w http.ResponseWriter, r *http.Request) {
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

	if Data.Action != "Echo" {
		new_data, err := HandleRequest(Data)
		if err != nil {
			fmt.Println(err)
			fmt.Println("Help!")
		}

		json.NewEncoder(w).Encode(new_data)
	} else {
		json.NewEncoder(w).Encode(Data)
	}

}

//No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
// The possible actions you can take are as follows:
// Create-Event - Create a new event given the user, event name, event description, day, and timeslots.
// Get-All-Events - Just returns the data for every event in the calendar.
// Get-Events-Attending - Given a user, get the events that they are attending.
// Get-Events-Created - Given a user, get the events that they have created.
// Get-Events-For-Days - Given a day, get all events for that day.
// Get-Attendees - Given an event ID, get all attendees for that event.
// Register-For-Event - Given a user, event name, and timeslots, register for that event.
// Sign-Up - Given a user, sign them up (add them to the DB).
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

	case "Get-All-Events":
		var return_this return_data
		event_info, timeslots := processing.GetEvents("", "", "", nil)
		return_this.Message = "OK"
		return_this.Event_Info = event_info
		return_this.Timeslots = timeslots
		return return_this, nil

	case "Get-Events-Attending":
		var return_this return_data
		event_info, timeslots := processing.GetEvents("", "", user, nil)
		return_this.Message = "OK"
		return_this.Event_Info = event_info
		return_this.Timeslots = timeslots
		return return_this, nil

	case "Get-Events-Created":
		var return_this return_data
		event_info, timeslots := processing.GetEvents("", user, "", nil)
		return_this.Message = "OK"
		return_this.Event_Info = event_info
		return_this.Timeslots = timeslots
		return return_this, nil

	case "Get-Events-For-Days":
		var return_this return_data
		event_info, timeslots := processing.GetEvents("", "", "", []string{day})
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

//Creates a new router and then continually listens for a POST request on port 10000.
func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", apicall).Methods("POST")

	log.Fatal(http.ListenAndServe(":10000", myRouter))
}
