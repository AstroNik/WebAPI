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
	router.HandleFunc("/getSensorData", sendData)
	router.HandleFunc("/dataProcess", dataProcess)
	log.Fatal(http.ListenAndServe(":8080", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome home!")
}

func sendData(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"DateTime":            time.Now().String(),
		"AirValue":            "850",
		"WaterValue":          "450",
		"SoilMoisturePercent": "50",
		"SoilMoistureValue":   "650",
	}
	b, err := json.Marshal(data)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, string(b))
	json.NewEncoder(w).Encode(b)
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	sensorData := structs.Sensor{}
	sensorData.DateTime = time.Now()
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Cannot Decode Data")
	}
	json.Unmarshal(reqBody, &sensorData)
	log.Println("You hit me")
}
