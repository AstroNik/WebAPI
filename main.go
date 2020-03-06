package main

import (
	"encoding/json"
	"fmt"
	"github.com/AstroNik/WebCommon/structs"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
	"time"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage)
	router.HandleFunc("/getSensorData", dataProcess)
	router.HandleFunc("/sendSensorData", sendData)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	sensorData := structs.Sensor{}
	sensorData.DateTime = time.Now()
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Cannot Decode Data")
	}
	json.Unmarshal(reqBody, &sensorData)
	fmt.Fprintf(w, "Data Process!")
}

func sendData(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Send Data")
}
