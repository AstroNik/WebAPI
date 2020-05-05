package main

import (
	"encoding/json"
	"fmt"
	"github.com/AstroNik/WebCommon/db"
	"github.com/AstroNik/WebCommon/structs"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage)
	router.HandleFunc("/getSensorData", sendData)
	router.HandleFunc("/dataProcess", dataProcess)
	router.HandleFunc("/signup", signup)
	router.HandleFunc("/signin", signin)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("Soil Moisture Sensor by ECOders")
}

func sendData(w http.ResponseWriter, r *http.Request) {
	sensorData := db.GetMoistureData("234556314")
	json.NewEncoder(w).Encode(sensorData)

}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	sensorData := structs.SensorData{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&sensorData)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Print("Data from Sensor: ", sensorData)

	//The BELOW is how the data will be Inserted into the Database
	currTime := time.Now() //Time is in UTC Format
	currTime.Format(time.RFC3339)
	sensor := structs.Sensor{
		SensorId:            0,                 //will correspond with the device sending the data
		SensorName:          "Moisture Sensor", //will have to have somewhere we can set this data up in the app
		DateTime:            currTime,
		AirValue:            sensorData.AirValue,
		WaterValue:          sensorData.WaterValue,
		SoilMoistureValue:   sensorData.SoilMoistureValue,
		SoilMoisturePercent: sensorData.SoilMoisturePercent,
	}
	//temporary customerID
	db.InsertMoistureData("234556314", sensor)
}

func signup(w http.ResponseWriter, r *http.Request) {
	//TODO: Decode data being sent for application
	//format data into correct format
	//encrypt password
	//store in db

}
func signin(w http.ResponseWriter, r *http.Request) {
	//check if user exist
	//allow access

}
