import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { postAlunoTurma } from "../../../api/api";

export function usePostAlunoTurma() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return postAlunoTurma(token, data).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["turma-data"],
      });
      console.log("DEU CERTO");
    },
  });

  return mutation;
}
