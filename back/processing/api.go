package processing

import (
	"Calendar-App/back/processing"
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"io/ioutil"
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
	
	json.NewEncoder(w).Encode(Data)
}

func apifetch(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Hello World!")

	var Data data

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Kindly enter data with the event title and description only in order to update")
	}

	json.Unmarshal(reqBody, &Data)

	events.CreateEvent(Data.User, Data.Times)
	
	json.NewEncoder(w).Encode(Data)
}

func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)
	
	myRouter.HandleFunc("/api/", apicall).Methods("POST")
	myRouter.HandleFunc("/api/", apifetch).Methods("FETCH")
	
	log.Fatal(http.ListenAndServe(":10000", myRouter))
}


func main() {
	fmt.Println("Hello world!")

	handleRequests()
}
