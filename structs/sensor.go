package structs

import "time"

type Sensor struct {
	ID                  string    `json:"id"`
	DateTime            time.Time `json:"dateTime"`
	SensorName          string    `json:"sensorName"`
	AirValue            int       `json:"airValue"`
	WaterValue          int       `json:"waterValue"`
	SoilMoistureValue   int       `json:"soilMoistureValue"`
	SoilMoisturePercent int       `json:"soilMoisturePercent"`
}
