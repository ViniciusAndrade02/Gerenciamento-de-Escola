import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { deleteAlunoTurma } from "../../../api/api";

export function useAlunoDelete() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (idAluno: any) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return deleteAlunoTurma(token, idAluno).then((response) => response.data);
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
