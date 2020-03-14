package main

import (
	"encoding/json"
	"fmt"
	"github.com/AstroNik/WebCommon/db"
	"github.com/AstroNik/WebCommon/structs"
	"github.com/gorilla/mux"
	"log"
	"net/http"
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
	//currTime := time.Now().Format(time.RFC3339)
	sensorData := structs.SensorData{}
	sensorData.AirValue = 850
	sensorData.WaterValue = 450
	sensorData.SoilMoistureValue = 700
	sensorData.SoilMoisturePercent = 60
	json.NewEncoder(w).Encode(sensorData)

}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	sensorData := structs.SensorData{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&sensorData)
	if err != nil {
		fmt.Println("error decoding the response to the join request")
		log.Fatal(err)
	}
	log.Print(sensorData)
}
