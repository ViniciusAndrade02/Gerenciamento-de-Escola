import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { putUsuario } from "../../../api/api";

export function useUpdateUsuario() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({ idUsuario, data }: { idUsuario: string; data: any }) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return putUsuario(token, idUsuario, data).then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["usuario-data"],
      });
      console.log("FUNCIONOU");
    },
  });

  return mutation;
}
