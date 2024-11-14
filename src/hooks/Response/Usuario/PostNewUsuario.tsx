import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { postUsuario } from "../../../api/api";
import { PostUsuarioResponse } from "../../../api/InterfaceApi";

export function usePostUsuario() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (data: PostUsuarioResponse) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return postUsuario(token, data).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuario-data"],
      });
      console.log("DEU CERTO");
    },
  });

  return mutation;
}
