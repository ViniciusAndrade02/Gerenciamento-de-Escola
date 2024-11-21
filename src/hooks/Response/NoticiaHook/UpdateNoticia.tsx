import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../context/Auth";
import { putNoticia } from "../../../api/api";

export function useUpdateNoticia() {
  const queryClient = useQueryClient();
  const { token } = useContext(AuthContext);

  const mutation = useMutation({
    mutationFn: ({idNoticia,data} : {idNoticia:string,data:any}) => {
      if (!token) {
        throw new Error("TOKEN NÃO ENCONTRADO");
      }
      return putNoticia(idNoticia, token, data).then(
        (response) => response.data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["noticia-data"],
      });
    },
  });

  return mutation;
}
