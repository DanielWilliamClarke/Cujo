package cv

import (
	"context"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type RouteHandler struct {
	Conn *mongo.Collection
}

func (r RouteHandler) Get(res http.ResponseWriter, req *http.Request) {

	var cv TestModel
	err := r.Conn.FindOne(context.TODO(), &bson.M{}).Decode(&cv)

	if err != nil {
		log.Printf("%+v\n", err)
	}

	res.Write([]byte(cv.CV))
}
