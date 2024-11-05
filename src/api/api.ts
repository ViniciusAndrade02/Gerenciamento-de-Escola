import axios from "axios";

export const api = axios.create({
  baseURL: "http://44.223.188.239:8080", // URL da API
  headers: {
    "Content-Type": "application/json",
  },
});

