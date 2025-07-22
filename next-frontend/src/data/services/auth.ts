import { API_URL } from "@/data/constants";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Login inválido")
  }

  const data = await res.json()
  return data.access_token
}

export async function register(email: string, password: string, name: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  });

  if (!res.ok) {
    throw new Error("Erro ao cadastrar usuário")
  }

  const data = await res.json()
  return data.access_token
}

export async function profile() {
  const token = localStorage.getItem("token")

  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  if (!res.ok) {
    throw new Error("Não autenticado")
  }

  return res.json()
}