package handler

import (
	"auth/internal/model"
	"auth/internal/token"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func Login(c *gin.Context) {
	var body model.User
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "customMessage": "dados inválidos"})
		return
	}

	if body.Email != "test@test.com" || body.Password != "123456" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "email ou senha inválidos"})
		return
	}

	jwt, err := token.GenerateJWT(body.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "customMessage": "erro ao gerar token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"token": jwt})
}

func ValidateToken(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "token não encontrado"})
		return
	}

	tokenStr := strings.TrimPrefix(authHeader, "Bearer")

	tok, err := token.ValidateJWT(tokenStr)
	if err != nil || !tok.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "token inválido"})
		return
	}

	claims := tok.Claims.(jwt.MapClaims)
	email := claims["sub"].(string)

	c.JSON(http.StatusOK, gin.H{"email": email})
}
