import axios, { AxiosPromise } from "axios";
import { CardapioResponse, GetTurmasResponse, NoticiaResponse, PostAlunosTurmaEspecifica, PostNewTurmas, PutNoticiaResponse,UsuarioResponse } from "./InterfaceApi";

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
  console.log(data)
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

export const postTurma = async (token:string | null,data:PostNewTurmas):AxiosPromise<PostNewTurmas> => {
  const response = await axios.post<PostNewTurmas>(`${baseUrl}/turmas`,data,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}

export const uploadTurma = async (token:string | null,idTurma:string,data:any) => {
  const response = await axios.put(`${baseUrl}/turmas/${idTurma}`,data,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}

export const deleteTurma = async (token:string | null,idTurma:string) => {
  const response = await axios.delete(`${baseUrl}/turmas/${idTurma}`,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}

export const postAlunoTurma = async (token:string | null,data:PostAlunosTurmaEspecifica):AxiosPromise<PostAlunosTurmaEspecifica> => {
  const response = await axios.post<PostAlunosTurmaEspecifica>(`${baseUrl}/alunos`,data,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}

export const putAlunoTurma = async (token:string | null,idAluno:string,data:any) => {
  const response = await axios.put(`${baseUrl}/alunos/${idAluno}`,data,{
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return response
}


export const deleteAlunoTurma = async (token:string | null,idAluno:string) => {
  const response = await axios.delete(`${baseUrl}/alunos/${idAluno}`,{
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

export const putCardapio = async (token: string | null,semana:string,data:string) => {
  const response = await axios.put(`${baseUrl}/cardapio/${semana}`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export const postUsuario = async (token: string | null,data:UsuarioResponse): AxiosPromise<UsuarioResponse> => {
  const response = await axios.post<UsuarioResponse>(`${baseUrl}/usuario`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export const getUsuario = async (token: string): AxiosPromise<UsuarioResponse> => {
  const response = await axios.get<UsuarioResponse>(`${baseUrl}/usuario`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}

export const putUsuario = async (token: string,idUsuario:string,data:any) => {
  const response = await axios.put(`${baseUrl}/usuario/${idUsuario}`,data,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}


export const deleteUsuario = async (token: string,idUsuario:string) => {
  const response = await axios.delete(`${baseUrl}/usuario/${idUsuario}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}


// export const getInformationUser = async (token:)