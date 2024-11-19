import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { deleteTurma } from "../../../api/api";

export function useTurmaDelete() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (idTurma: string) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return deleteTurma(token, idTurma).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turma-data"],
      });
      console.log("Deletado com sucesso");
    },
  });

  return mutation;
}
