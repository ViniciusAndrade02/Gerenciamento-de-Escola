import axios, { AxiosPromise } from "axios";
import { CardapioResponse, GetTurmasResponse, NoticiaResponse, PutNoticiaResponse,PostUsuarioResponse } from "./InterfaceApi";

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

export const postNoticia = async (token:string | null,data:any): AxiosPromise<any> => {
  const response = await axios.post<any>(`${baseUrl}/noticias`,data,{
    headers:{
      Authorization: `Bearer ${token}`,
    },
  })
  return response
}

export const putNoticia = async (idNoticia:string,token:any,data:PutNoticiaResponse):AxiosPromise<PutNoticiaResponse> => {
    const response = await axios.put<PutNoticiaResponse>(`${baseUrl}/noticias/${idNoticia}`,data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response
}

export const deleteNoticia = async (token:any,idNoticia:string):AxiosPromise<any> => {
  const response = await axios.delete<any>(`${baseUrl}/noticias/${idNoticia}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response
}

export const getTurma = async (token:string | null):AxiosPromise<GetTurmasResponse> => {
  const response = await axios.get<GetTurmasResponse>(`${baseUrl}/turmas`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}


export const getCardapio = async (token: string | null): AxiosPromise<CardapioResponse> => {
  const response = await axios.get<CardapioResponse>(`${baseUrl}/cardapio`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export const postUsuario = async (token: string | null,data:PostUsuarioResponse): AxiosPromise<PostUsuarioResponse> => {
  const response = await axios.post<PostUsuarioResponse>(`${baseUrl}/usuario`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

// export const getInformationUser = async (token:)