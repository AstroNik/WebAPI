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
	//Here we need to retrieve the most recent data for the sensor inputted in the db
	//the struct will have to change from SensorData -> Sensor

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
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Print(sensorData)

	//The BELOW is how the data will be Inserted into the Database
	//currTime := time.Now().Format(time.RFC3339) //Time is in UTC Format
	//sensor := structs.Sensor{
	//	SensorId:   0, //will correspond with the device sending the data
	//	SensorName: "", //will have to have somewhere we can set this data up in the app
	//	DateTime:   currTime,
	//	SensorData: sensorData,
	//}
	//db.InsertMoistureData(sensor)
}
