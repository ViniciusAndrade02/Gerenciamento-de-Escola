import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { uploadTurma } from "../../../api/api";

export function useUpdateTurma() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({ idTurma, data }: { idTurma: string; data: any }) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return uploadTurma(token, idTurma, data).then(
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