import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { postTurma } from "../../../api/api";
import { PostNewTurmas } from "../../../api/InterfaceApi";

export function usePostNewTurma() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data: PostNewTurmas) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return postTurma(token, data).then((response) => response.data);
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
