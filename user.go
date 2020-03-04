package main

type User struct {
	ID        string `json:"_id" bson:"_id"`
	FirstName string `json:"firstName" bson:"firstName"`
	LastName  string `json:"LastName" bson:"lastName"`
	Email     string `json:"email" bson:"email"`
	Password  string `json:"password" bson:"password"`
}
