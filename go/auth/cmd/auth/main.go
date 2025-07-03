package main

import (
	"auth/internal/handler"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("AUTH SERVICE")

	r := gin.Default()

	r.POST("/login", handler.Login)
	r.GET("/validate", handler.ValidateToken)

	r.Run(":3002")
}
