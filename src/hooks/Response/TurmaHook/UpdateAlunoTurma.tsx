import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { putAlunoTurma } from "../../../api/api";

export function useUpdateAluno() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({ idAluno, data }: { idAluno: string; data: any }) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return putAlunoTurma(token, idAluno, data).then(
        (response) => response.data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turma-data"],
        
      });
      console.log('FUNCIONOU')
    },
  });

  return mutation;
}
