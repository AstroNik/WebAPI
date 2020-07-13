package backend

import (
	"encoding/json"
	firebase "firebase.google.com/go/v4"
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

		//Different check will be done here
		if header == "" {
			log.Print("EMPTY HEADER")
			//w.WriteHeader(http.StatusForbidden)
			////_ = json.NewEncoder(w).Encode("Missing Token")
			//RETURN SOME STATUS TO SHOW IN FRONT END OR SOMETHING
			return
		}

		//INIT FIREBASE APP
		ctx := context.Background()
		opt := option.WithCredentialsFile("firebaseSA.json") //import file as env var??
		app, err := firebase.NewApp(ctx, nil, opt)
		if err != nil {
			log.Fatalf("error initializing app: %v\n", err)
		}

		client, err := app.Auth(ctx)
		if err != nil {
			log.Fatalf("error getting Auth client: %v\n", err)
		}

		header = strings.Trim(header, "Bearer")
		header = strings.TrimSpace(header)

		token, err := client.VerifyIDToken(ctx, header)
		if err != nil {
			log.Fatalf("error verifying ID token: %v\n", err)
			//return response here if failed to validate token.
		}

		log.Printf("Verified ID token: %v\n", token)

		handler(w, r)
	}
}
