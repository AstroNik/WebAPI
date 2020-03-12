package main

import (
	"encoding/json"
	"fmt"
	"github.com/AstroNik/WebCommon/db"
	"github.com/AstroNik/WebCommon/structs"
	"github.com/gorilla/mux"
	"io/ioutil"
	"log"
	"net/http"
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
	sensorData := structs.SensorInfo{}
	sensorData.AirValue = 850
	sensorData.WaterValue = 450
	sensorData.SoilMoistureValue = 650
	sensorData.SoilMoisturePercent = 50
	sensorData.SensorName = "IDK"
	//b, err := json.Marshal(sensorData)
	//if err != nil {
	//	log.Fatal(err)
	//}
	json.NewEncoder(w).Encode(sensorData)

}

func testDecode(w http.ResponseWriter, r *http.Request) {
	var sensor structs.Sensor
	resp, err := http.Get("http://localhost:8080/getSensorData")
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
	sensorData := structs.SensorInfo{}
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Cannot Decode Data")
	}
	json.Unmarshal(reqBody, &sensorData)
	log.Println(sensorData)
	log.Println("You hit me")
}
