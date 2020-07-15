package main

import (
	"encoding/json"
	"fmt"
	"github.com/AstroNik/WebAPI/backend"
	"github.com/AstroNik/WebCommon/db"
	"github.com/AstroNik/WebCommon/structs"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//router.HandleFunc("/getSensorData", getSensorData)
	router.HandleFunc("/getSensorData", backend.HandleSecureFunc(getSensorData))
	router.HandleFunc("/dataProcess", dataProcess)
	router.HandleFunc("/addUser", backend.HandleSecureFunc(signUpUser))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./admin/build")))
	log.Fatal(http.ListenAndServe(":8080", router))
}

func getSensorData(w http.ResponseWriter, r *http.Request) {
	user := structs.User{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&user)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Print(user)
	deviceData := db.GetMoistureData(user.UID)
	_ = json.NewEncoder(w).Encode(deviceData)
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	deviceData := structs.DeviceData{}
	uid := deviceData.UID
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&deviceData)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Print("Data from Sensor: ", deviceData)

	//The BELOW is how the data will be Inserted into the Database
	currTime := time.Now() //Time is in UTC Format
	currTime.Format(time.RFC3339)
	sensor := structs.Device{
		//DeviceID:            deviceData.DeviceID, //will correspond with the device sending the data
		DeviceName: "", //will have to have somewhere we can set this data up in the app
		DateTime:   currTime,
		//Battery:             deviceData.Battery,
		AirValue:            deviceData.AirValue,
		WaterValue:          deviceData.WaterValue,
		SoilMoistureValue:   deviceData.SoilMoistureValue,
		SoilMoisturePercent: deviceData.SoilMoisturePercent,
	}
	db.InsertMoistureData(uid, sensor)
}

func signUpUser(w http.ResponseWriter, r *http.Request) {
	newUser := structs.NewUser{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&newUser)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	log.Print("User Data: ", newUser)
	db.InsertUser(newUser)

	//return response with empty data objects for different sections
}
