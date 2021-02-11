package cv

import (
	ctx "context"
	"log"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// RouteHandler implements route handler for CV
type RouteHandler struct {
	Conn *mongo.Collection
}

// Get fetchs CV data from mongo
func (r RouteHandler) Get(context *fiber.Ctx) error {

	var cv CurriculumVitae
	err := r.Conn.FindOne(ctx.Background(), &bson.M{}).Decode(&cv)
	if err != nil {
		log.Printf("%+v\n", err)
		return err
	}

	context.Status(fiber.StatusOK).JSON(cv)
	return nil
}
