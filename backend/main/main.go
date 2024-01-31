package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"backend/database"
	"backend/routes"
)

func main() {
	database.InitializeDatabase()

	r := gin.Default()
	r.Use(cors.Default())

	routes.SetupRoutes(r)

	// Run the server
	r.Run(":8080")
}