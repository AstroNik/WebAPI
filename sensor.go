package main

import (
	"go.mongodb.org/mongo-driver/bson"
	"time"
)

type Sensor struct {
	ID                  bson.PrimitiveCodecs `json:"_id" bson:"_id"`
	DateTime            time.Time            `json:"dateTime" bson:"dateTime"`
	SensorName          string               `json:"sensorName" bson:"sensorName"`
	AirValue            int                  `json:"airValue" bson:"airValue"`
	WaterValue          int                  `json:"waterValue" bson:"waterValue"`
	SoilMoistureValue   int                  `json:"soilMoistureValue" bson:"soilMoistureValue"`
	SoilMoisturePercent int                  `json:"soilMoisturePercent" bson:"soilMoisturePercent"`
}
