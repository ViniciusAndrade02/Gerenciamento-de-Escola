import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { getUsuario } from "../../../api/api";

export function useGetUsuarios() {
  const { token } = useContext(AuthContext);

  const query = useQuery({
    queryFn: () => {
      if(!token){
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return getUsuario(token)
    },
    queryKey: ["usuario-data"],
    retry: false,
  });

  return {
    ...query,
    data: query.data?.data, // Extrai os dados
  };
}