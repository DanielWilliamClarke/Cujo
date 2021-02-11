package main

import (
	"log"

	"github.com/caarlos0/env/v6"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"

	"github.com/danielwilliamclarke/cujo_server/cv"
	"github.com/danielwilliamclarke/cujo_server/mongo"
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

	// Create web server
	app := fiber.New()
	app.Use(logger.New())

	api := app.Group("/api/v1")
	api.Get("/cv", cv.RouteHandler{Conn: client}.Get)

	log.Printf("Cujo server started on port %s", config.Port)
	err = app.Listen(":" + config.Port)
	if err != nil {
		log.Fatalf("Error in starting server: %s", err)
	}
}
