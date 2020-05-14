package cv

import (
	ctx "context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type RouteHandler struct {
	Conn *mongo.Collection
}

func (r RouteHandler) Get(context *gin.Context) {

	var cv CurriculumVitae
	err := r.Conn.FindOne(ctx.Background(), &bson.M{}).Decode(&cv)

	if err != nil {
		log.Printf("%+v\n", err)
	}

	context.JSON(http.StatusOK, cv)
}
