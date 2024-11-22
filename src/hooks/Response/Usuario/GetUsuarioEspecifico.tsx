import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { getUsuarioEspecifico } from "../../../api/api";

export function useGetUsuariosEspecifico(idUsuario:string | null) {
  const { token } = useContext(AuthContext);

  const query = useQuery({
    queryFn: () => {
      if(!token){
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return getUsuarioEspecifico(token,idUsuario)
    },
    queryKey: ["usuario-data"],
    retry: false,
  });

  return {
    ...query,
    data: query.data?.data, // Extrai os dados
  };
}