package structs

import (
	"time"
)

type Sensor struct {
	ID                  string    `json:"ID"`
	DateTime            time.Time `json:"DateTime"`
	SensorName          string    `json:"SensorName"`
	AirValue            int       `json:"AirValue"`
	WaterValue          int       `json:"WaterValue""`
	SoilMoistureValue   int       `json:"SoilMoistureValue"`
	SoilMoisturePercent int       `json:"SoilMoisturePercent"`
}
