package main

import (
	"github.com/AstroNik/WebAPICommon/structs"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/sensorData", dataProcess)
	router.HandleFunc("/sendData", sendData)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	sensorData := structs.Sensor{}
	sensorData.DateTime = time.Now()
}

func sendData(w http.ResponseWriter, r *http.Request) {

}
