package main

import (
	"log"
	"net/http"
	"os"

	"github.com/caarlos0/env/v6"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	"github.com/danielwilliamclarke/cv_server/cv"
	"github.com/danielwilliamclarke/cv_server/mongo"
)

type serverConfig struct {
	Port string `env:"PORT,required"`
}

func main() {
	// Parse server configuration
	config := serverConfig{}
	err := env.Parse(&config)
	if err != nil {
		log.Fatalf("%+v\n", err)
	}

	// Parse mongo configuration
	mongoConfig := mongo.MongoConfig{}
	err = env.Parse(&mongoConfig)
	if err != nil {
		log.Fatalf("%+v\n", err)
	}
	client, err := mongoConfig.Connect("data")
	if err != nil {
		log.Fatalf("%+v\n", err)
	}

	//Init Router
	r := mux.NewRouter()
	r.HandleFunc("/cv", cv.RouteHandler{Conn: client}.Get).Methods("GET")

	loggedRouter := handlers.LoggingHandler(os.Stdout, r)
	log.Fatal(http.ListenAndServe(":"+config.Port, loggedRouter))
}
