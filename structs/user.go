package structs

type User struct {
	ID        string `json:"ID"`
	FirstName string `json:"FirstName"`
	LastName  string `json:"LastName"`
	Email     string `json:"Email"`
	Password  string `json:"Password"` //this needs to be encode when saved and decoded when signing in
}
