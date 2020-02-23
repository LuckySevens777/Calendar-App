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
	"strings"
)

type data struct {
	User string `json:"User"`
	Action string `json:"Action"`
	Day string `json:"Day"`
	Times []string `json:"Times"`
	Event_Name string `json:"Event_Name"`
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

	str, err := HandleRequest(Data)

	if err != nil {
		fmt.Println(err)
		fmt.Println("Help!")
	}

	fmt.Println(str)
	
	json.NewEncoder(w).Encode(Data)
}

//Handles turning incoming header info into an action.  Should be moved to API eventually.  No authentication is done on this other than making sure the action is valid (and has all its pieces).  Will throw an error if the request is invalid.
func HandleRequest(Data data) (string, error) {
	user := Data.User
	
	if user == "" {
		return "", errors.New("No user specified in header")
	}
	
	action := Data.Action

	times := Data.Times
	eventName := Data.Event_Name

	errTimes := times != nil
	errEventName := eventName != ""
	if len(eventName) == 0 {
		errEventName = false
	}

	switch action {
	case "Create-Event":
		
		if !errTimes {
			return "", errors.New("Header doesn't contain the times key")
		}
		
		err := processing.CreateEvent(user, times)
		
		if err != nil {
			return "", err
		}
		
		return "OK", nil
	case "Get-Events":
		
		if !errTimes {
			return "", errors.New("Header doesn't contain the time key")
		}
		
		return processing.GetEvents(user, times), nil
	case "Get-Attendees":
		
		if !errEventName {
			return "", errors.New("Header doesn't contain the eventName key")
		}
		
		end, err := processing.GetAttendees(user, eventName)
		
		return strings.Join(end,","), err
	case "Register-For-Event":
		
		if !errTimes || !errEventName {
			return "", errors.New("Header doesn't contain both of the eventName, time keys")
		}
		
		err := processing.RegisterForEvent(user, eventName, times)
		
		if err != nil {
			return "", err
		}
		
		return "OK", nil
	default:
		return "", errors.New("No action selected")
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
