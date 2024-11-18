import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { deleteUsuario } from "../../../api/api";

export function useUsuarioDelete() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: (idUsuario: any) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return deleteUsuario(token, idUsuario).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuario-data"],
      });
      console.log("Deletado com sucesso");
    },
  });

  return mutation;
}
