package routes

import (
	"github.com/gin-gonic/gin"
	"backend/controller"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/users", controller.GetUsers)
	r.GET("/user/:id", controller.GetUser)
	r.POST("/user", controller.CreateUser)
	r.PUT("/user/:id", controller.UpdateUser)
	r.DELETE("/user/:id", controller.DeleteUser)
}
