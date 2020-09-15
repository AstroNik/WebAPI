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
	router.HandleFunc("/login", backend.HandleSecureFunc(login))
	router.HandleFunc("/addUser", backend.HandleSecureFunc(signUpUser))

	router.HandleFunc("/devicelogin", backend.HandleSecureLogin)
	router.HandleFunc("/dataProcess", dataProcess)

	router.HandleFunc("/getSensorData", backend.HandleSecureFunc(getSensorData))
	router.HandleFunc("/uniqueDeviceData", backend.HandleSecureFunc(uniqueDeviceData))
	router.HandleFunc("/specificDate", differentDayChartData)

	router.HandleFunc("/getPlantData", backend.HandleSecureFunc(getPlantData))
	router.HandleFunc("/getAllPlantData", backend.HandleSecureFunc(getAllPlantData))

	spa := spaHandler{staticPath: "./admin/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	svr := &http.Server{
		Handler: router,
		Addr:    ":8080",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(svr.ListenAndServe())
}

func login(w http.ResponseWriter, r *http.Request) {
	user := structs.User{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&user)
	if err != nil {
		fmt.Println("error decoding the response")
		//log.Fatal(err)
	}
	log.Print(user)

	userData := db.RetrieveUserInfo(user.UID)
	_ = json.NewEncoder(w).Encode(userData)
}

func getSensorData(w http.ResponseWriter, r *http.Request) {
	type UserDevice struct {
		UID string
	}

	var user UserDevice

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&user)
	if err != nil {
		fmt.Println("error decoding the response")
		//log.Fatal(err)
	}
	log.Print(user)

	dashboardData := db.GetMoistureData(user.UID)

	_ = json.NewEncoder(w).Encode(dashboardData)
}

func uniqueDeviceData(w http.ResponseWriter, r *http.Request) {
	type UserDevice struct {
		UID      string
		TimeZone string
	}

	var userDevice UserDevice
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&userDevice)
	if err != nil {
		log.Printf("error decoding the response, %+v", err)
		//log.Fatal(err)
	}

	specificDeviceData := db.GetAllMoistureData(userDevice.UID, userDevice.TimeZone)
	_ = json.NewEncoder(w).Encode(specificDeviceData)
}

func dataProcess(w http.ResponseWriter, r *http.Request) {
	deviceData := structs.DeviceData{}
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&deviceData)
	if err != nil {
		log.Printf("error decoding the response, %+v", err)
		//log.Fatal(err)
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
		log.Printf("error decoding the response, %+v", err)
		//log.Fatal(err)
	}
	log.Print("User Data: ", newUser)
	db.InsertUser(newUser)
}

func differentDayChartData(w http.ResponseWriter, r *http.Request) {
	type UserDevice struct {
		UID      string
		DeviceId int
		Date     time.Time
		TimeZone string
	}

	var userDevice UserDevice
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&userDevice)
	if err != nil {
		log.Printf("error decoding the response, %+v", err)
		//log.Fatal(err)
	}
	log.Print(userDevice.Date)
	specificDateData := db.GetSpecificDayChartData(userDevice.UID, userDevice.DeviceId, userDevice.Date, userDevice.TimeZone)
	_ = json.NewEncoder(w).Encode(specificDateData)
}

func getPlantData(w http.ResponseWriter, r *http.Request) {
	type PlantName struct {
		PlantName string
	}

	var plantName PlantName
	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&plantName)
	if err != nil {
		log.Printf("error decoding the response, %+v", err)
		//log.Fatal(err)
	}

	plantData := db.GetPlantData(plantName.PlantName)
	log.Print(plantData)
	_ = json.NewEncoder(w).Encode(plantData)
}

func getAllPlantData(w http.ResponseWriter, r *http.Request) {
	allPlantData := db.GetAllPlantData()
	_ = json.NewEncoder(w).Encode(allPlantData)
}
