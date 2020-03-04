package main

import (
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

func connectClient() {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://devTeam:ecoders4@cluster0-grjmu.azure.mongodb.net/test"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	//tempDb := client.Database("temp")
	//userCollection := tempDb.Collection("users")
	//sensorCollection := tempDb.Collection("sensor")

	//userCollectionResult, err := userCollection.InsertOne(ctx,bson.D{{}})
}
