package main

import (
	"log"

	"github.com/caarlos0/env/v6"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

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
	gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.Use(cors.Default())
	apiRoutingGroup := router.Group("/api/v1")
	{
		apiRoutingGroup.GET("/cv", cv.RouteHandler{Conn: client}.Get)
	}

	log.Printf("Cujo server started on port %s", config.Port)
	err = router.Run(":" + config.Port)
	if err != nil {
		log.Fatalf("Error in starting server: %s", err)
	}
}
