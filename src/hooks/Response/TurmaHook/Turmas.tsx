import { getTurma } from "../../../api/api";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { useQuery } from "@tanstack/react-query";

export function useTurmas() {
  const { token } = useContext(AuthContext);

  const query = useQuery({
    queryFn: () => getTurma(token),
    queryKey: ["turma-data"],
    retry: false,
  });

  return {
    ...query,
    data: query.data?.data, // Extrai os dados
  };
}