package mongo

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoConfig struct {
	Host     string `env:"MONGO_HOST,required"`
	User     string `env:"MONGO_USER,required"`
	Pass     string `env:"MONGO_PASS,required"`
	Database string `env:"MONGO_DATABASE,required"`
}

func (m MongoConfig) Connect(collectionName string) (*mongo.Collection, error) {

	// Set client options
	clientOptions := options.
		Client().
		ApplyURI(fmt.Sprintf("mongodb://%s:%s@%s/%s", m.User, m.Pass, m.Host, m.Database))

	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		return nil, err
	}
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()
	// Connect to MongoDB
	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	log.Println("Connected to MongoDB!")
	collection := client.Database(m.Database).Collection(collectionName)
	return collection, nil
}
