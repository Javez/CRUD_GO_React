package main

import (
	"backend/database"
	"backend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	
	"log"
	"os"
	
	"github.com/joho/godotenv"
)

func loadEnv() {
	err := godotenv.Load("../config.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
}

func main() {
	loadEnv()
	dbConnectionString := os.Getenv("DB_CONNECTION_STRING")

	database.InitializeDatabase(dbConnectionString)

	r := gin.Default()
	r.Use(cors.Default())

	routes.SetupRoutes(r)

	// Run the server
	r.Run(":8080")
}
