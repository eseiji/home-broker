package token

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("temp_secret_key")

func GenerateJWT(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": email,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})
	return token.SignedString(jwtKey)
}

func ValidateJWT(tokenStr string) (*jwt.Token, error) {
	return jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
}
