package structs

type User struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	LastName  string `json:"LastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
