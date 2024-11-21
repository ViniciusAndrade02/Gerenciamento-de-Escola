import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { putCardapio } from "../../../api/api";

export function useUpdateCardapio() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({semana,data} : {semana:string,data:any}) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      console.log(semana,data)
      return putCardapio(token, semana, data).then(
        (response) => response.data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardapio-data"],
      });
    },
  });

  return mutation
}