package backend

/*
Code Written By
Nikhil Kapadia
991495131
*/

import (
	"encoding/json"
	firebase "firebase.google.com/go/v4"
	"github.com/AstroNik/WebCommon/db"
	"golang.org/x/net/context"
	"google.golang.org/api/option"
	"log"
	"net/http"
	"strings"
)

func HandleSecureFunc(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		log.Print("HANDLE SECURE FUNC")

		var header = r.Header.Get("Authorization")
		_ = json.NewEncoder(w).Encode(r)
		header = strings.TrimSpace(header)

		if header == "" {
			log.Print("EMPTY HEADER")
			w.WriteHeader(http.StatusForbidden)
			_ = json.NewEncoder(w).Encode("Empty Header")
			return
		}

		//INIT FIREBASE APP
		ctx := context.Background()
		opt := option.WithCredentialsFile("firebaseSA.json") //import file as env var??
		app, err := firebase.NewApp(ctx, nil, opt)
		if err != nil {
			log.Printf("error initializing app: %v\n", err)
		}

		client, err := app.Auth(ctx)
		if err != nil {
			log.Printf("error getting Auth client: %v\n", err)
		}

		token, err := client.VerifyIDToken(ctx, header)
		if err != nil {
			log.Printf("error verifying ID token: %v\n", err)
			w.WriteHeader(http.StatusUnauthorized)
			_ = json.NewEncoder(w).Encode("401")
		}

		log.Printf("Verified ID token: %v\n", token)

		handler(w, r)
	}
}

func HandleSecureLogin(w http.ResponseWriter, r *http.Request) {

	type DeviceSetup struct {
		Email      string
		DeviceId   int
		DeviceName string
	}

	device := DeviceSetup{}

	dec := json.NewDecoder(r.Body)
	err := dec.Decode(&device)
	if err != nil {
		log.Println("error decoding the response")
		//log.Fatal(err)
	}
	log.Print(device)

	//INIT FIREBASE APP
	ctx := context.Background()
	opt := option.WithCredentialsFile("firebaseSA.json") //import file as env var??
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Printf("error initializing app: %v\n", err)
	}

	client, err := app.Auth(ctx)
	if err != nil {
		log.Printf("error getting Auth client: %v\n", err)
	}

	u, err := client.GetUserByEmail(ctx, device.Email)
	if err != nil {
		log.Printf("error getting user by email %s: %v\n", device, err)
	}
	log.Printf("Successfully fetched user data: %v\n", u)

	log.Print(u.UID)

	db.AddDeviceToProfile(u.UID, device.DeviceId, device.DeviceName)

	_ = json.NewEncoder(w).Encode(u.UID)

}
