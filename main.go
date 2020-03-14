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
	log.Fatal(http.ListenAndServe(":8080", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	db.ConnectClient()
}

func sendData(w http.ResponseWriter, r *http.Request) {
	currTime := time.Now().Format(time.RFC3339)
	sensorData := structs.SensorData{}
	sensorData.DateTime = string(currTime)
	sensorData.AirValue = 850
	sensorData.WaterValue = 450
	sensorData.SoilMoistureValue = 700
	sensorData.SoilMoisturePercent = 60
	sensorData.SensorName = "SoilSensor"
	json.NewEncoder(w).Encode(sensorData)

}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	currTime := time.Now().Format(time.RFC3339)
	type data struct {
		aValue int
		wValue int
		mValue int
		mPerc  int
	}
	decode := data{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&decode)
	if err != nil {
		fmt.Println("error decoding the response to the join request")
		log.Fatal(err)
	}
	sensorData := structs.SensorData{}
	sensorData.DateTime = string(currTime)
	sensorData.AirValue = decode.aValue
	sensorData.WaterValue = decode.wValue
	sensorData.SoilMoistureValue = decode.mValue
	sensorData.SoilMoisturePercent = decode.mPerc
	log.Print(sensorData)
}
