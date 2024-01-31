package database

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)


var Client *mongo.Client
var Collection *mongo.Collection

func InitializeDatabase() {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().
		ApplyURI("mongodb+srv://mrjavez:vceLNfpPBHRUp2Rw@cluster0.lvfkaay.mongodb.net/").
		SetServerAPIOptions(serverAPI)

	var err error
	Client, err = mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	if err := Client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
	Collection = Client.Database("testdb").Collection("users")
}
