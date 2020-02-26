// Set of functions that interface with the frontend
package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/thecsw/Calendar-App/back/processing"
)

// Data Stores all the possible Data that should come in from the front end.
// Includes the name of the user, the action they want to take, the day they're
// looking at, the possible timeslots (for registration purposes),
// the event name, the event description, and the event ID
// Some of these may be empty, signifying the Data is not important
type Data struct {
	User             string   `json:"User"`
	Action           string   `json:"Action"`
	Day              []string `json:"Day"`
	Times            []string `json:"Times"`
	EventName        string   `json:"Event_Name"`
	EventDescription string   `json:"Event_Description"`
	EventID          string   `json:"Event_ID"`
}

// ReturnData Stores all the possible data that could be returned to the front end.
// Includes a simple message for the front end to check, and the result of the get_attendees
// and get_event methods
type ReturnData struct {
	Message       string              `json:"Message"`
	AttendeeNames []string            `json:"Attendee_Names"`
	EventInfo     []map[string]string `json:"Event_Info"`
	Timeslots     [][]string          `json:"Timeslots"`
}

// apicall Parses the data obtained from the front-end into the data struct, then sends
// the data into the handle method
func apicall(w http.ResponseWriter, r *http.Request) {
	input := Data{}
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Data entered is invalid")
	}
	json.Unmarshal(reqBody, &input)
	if input.Action != "Echo" {
		newData, err := HandleRequest(input)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			fmt.Println("Caught an error:", err)
		}
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(newData)
	} else {
		json.NewEncoder(w).Encode(input)
	}
}

// HandleRequest No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
// The possible actions you can take are as follows:
//   Create-Event - Create a new event given the user, event name, event description, day, and timeslots.
//   Get-All-Events - Just returns the data for every event in the calendar.
//   Get-Events-Attending - Given a user, get the events that they are attending.
//   Get-Events-Created - Given a user, get the events that they have created.
//   Get-Events-For-Days - Given a day, get all events for that day.
//   Get-Attendees - Given an event ID, get all attendees for that event.
//   Register-For-Event - Given a user, event name, and timeslots, register for that event.
//   Sign-Up - Given a user, sign them up (add them to the DB).
func HandleRequest(InData Data) (returnThis ReturnData, err error) {
	returnThis.Message = "OK"
	switch InData.Action {
	case "Create-Event":
		err = processing.CreateEvent(
			InData.User,
			InData.EventName,
			InData.EventDescription,
			InData.Day[0],
			InData.Times,
		)
		if err != nil {
			returnThis.Message = err.Error()
		}
		return
	case "Get-All-Events":
		fillReturnObj(&returnThis, "", "", "", nil)
		return
	case "Get-Events-Attending":
		fillReturnObj(&returnThis, "", "", InData.User, nil)
		return
	case "Get-Events-Created":
		fillReturnObj(&returnThis, "", InData.User, "", nil)
		return
	case "Get-Events-For-Days":
		fillReturnObj(&returnThis, "", "", "", InData.Day)
		return
	case "Get-Attendees":
		attendees, timeslots, errTemp := processing.GetAttendees(InData.EventID)
		if errTemp != nil {
			// I'm ashamed of doing this
			err = errTemp
			returnThis.Message = errTemp.Error()
			return
		}
		returnThis.AttendeeNames = attendees
		returnThis.Timeslots = timeslots
		return returnThis, nil
	case "Register-For-Event":
		err = processing.RegisterForEvent(InData.User, InData.EventName, InData.Times)
		if err != nil {
			returnThis.Message = err.Error()
		}
		return
	case "Sign-Up":
		err = processing.SignUp(InData.User)
		if err != nil {
			returnThis.Message = err.Error()
		}
		return
	default:
		returnThis.Message = "No Action Selected"
		err = errors.New("No action selected")
		return
	}
}

func fillReturnObj(object *ReturnData, name, creator, attendee string, days []string) {
	eventInfo, timeslots := processing.GetEvents(name, creator, attendee, days)
	object.EventInfo = eventInfo
	object.Timeslots = timeslots
}

// HandleRequests Creates a new router and then continually listens for a POST request on port 10000.
func HandleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/", apicall).Methods(http.MethodPost)
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}
