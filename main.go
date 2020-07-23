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
	"os"
	"path/filepath"
	"time"
)

type spaHandler struct {
	staticPath string
	indexPath  string
}

func (h spaHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	path = filepath.Join(h.staticPath, r.URL.Path)

	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(h.staticPath, h.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(h.staticPath)).ServeHTTP(w, r)
}

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/getSensorData", backend.HandleSecureFunc(getSensorData))
	router.HandleFunc("/dataProcess", dataProcess)
	router.HandleFunc("/addUser", backend.HandleSecureFunc(signUpUser))
	router.HandleFunc("/uniqueDeviceData", backend.HandleSecureFunc(uniqueDeviceData))

	spa := spaHandler{staticPath: "./admin/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

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
		DeviceID:            deviceData.DeviceID,
		DeviceName:          "",
		DateTime:            currTime,
		Battery:             deviceData.Battery,
		AirValue:            deviceData.AirValue,
		WaterValue:          deviceData.WaterValue,
		SoilMoistureValue:   deviceData.SoilMoistureValue,
		SoilMoisturePercent: deviceData.SoilMoisturePercent,
	}
	db.InsertMoistureData(deviceData.UID, sensor)
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
}

func uniqueDeviceData(w http.ResponseWriter, r *http.Request) {
	type UserDevice struct {
		UID      string
		DeviceId int
	}

	var userDevice UserDevice
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&userDevice)
	if err != nil {
		fmt.Println("error decoding the response")
		log.Fatal(err)
	}
	//specificDeviceData := db.GetAllMoistureData(userDevice.UID, userDevice.DeviceId)
	//_ = json.NewEncoder(w).Encode(specificDeviceData)
}
