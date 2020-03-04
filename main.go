package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/getSensorData", dataProcess)
	router.HandleFunc("/sendSensorData", sendData)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	connectClient()
	//sensorData := Sensor{}
	//sensorData.DateTime = time.Now()
}

func sendData(w http.ResponseWriter, r *http.Request) {

}
