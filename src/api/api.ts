import axios, { AxiosPromise } from "axios";
import { NoticiaResponse } from "./InterfaceApi";

const baseUrl = "http://44.223.188.239:8080";

export const api = axios.create({
  baseURL: baseUrl, // URL da API
  headers: {
    "Content-Type": "application/json",
  },
});

export const USER_NOTICIA = (token:any) => ({
  endpoint: "http://44.223.188.239:8080/noticias",
  method: "GET",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export const getNoticia = async (token: string | null): AxiosPromise<NoticiaResponse> => {
  const response = await axios.get<NoticiaResponse>(`${baseUrl}/noticias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};