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
	router.HandleFunc("/test", testDecode)
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
	//b, err := json.Marshal(sensorData)
	//if err != nil {
	//	log.Fatal(err)
	//}
	json.NewEncoder(w).Encode(sensorData)

}

func testDecode(w http.ResponseWriter, r *http.Request) {
	var sensor structs.SensorData
	resp, err := http.Get("http://52.152.247.223/getSensorData")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(resp.Status)
	dec := json.NewDecoder(resp.Body)
	err = dec.Decode(&sensor)
	if err != nil {
		fmt.Println("error decoding the response to the join request")
		log.Fatal(err)
	}

	fmt.Println(sensor)
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	//sensorData := structs.SensorData{}
	var decode []interface{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&decode)
	if err != nil {
		fmt.Println("error decoding the response to the join request")
		log.Fatal(err)
	}
	log.Print(decode)
}
