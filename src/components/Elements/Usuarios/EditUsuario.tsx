import {
  Box,
  Divider,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useUpdateUsuario } from "../../../hooks/Response/Usuario/UpdateUsuario";

interface EditUsuario {
  nome: string;
  email: string;
  telefone: string;
  idUsuario?: string;
  setAbrirEdit: any;
}

const EditUsuario = ({
  email,
  nome,
  telefone,
  idUsuario,
  setAbrirEdit,
}: EditUsuario) => {
  const [editUsuario, setEditUsuario] = useState({
    nome: nome,
    email: email,
    telefone: telefone,
  });
  const { mutate, status } = useUpdateUsuario();

  const ButtonEditAluno = (event: FormEvent, idUsuario?: string) => {
    event.preventDefault();

    console.log(editUsuario);
    console.log(idUsuario);
    if (idUsuario) {
      mutate({ idUsuario, data: editUsuario });
    }
  };

  if (status == "success") {
    setAbrirEdit(false);
  }

  return (
    <>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", marginTop: "8px" }}
      >
        <Divider />
        <label className="py-1" htmlFor="responsavel">
          Nome
        </label>
        <TextField
          id="nome"
          variant="outlined"
          value={editUsuario.nome}
          onChange={(event) =>
            setEditUsuario((prevState) => ({
              ...prevState,
              nome: event.target.value,
            }))
          }
        />

        <label className="py-1" htmlFor="responsavel">
          Email:
        </label>
        <TextField
          id="nome"
          variant="outlined"
          value={editUsuario.email}
          onChange={(event) =>
            setEditUsuario((prevState) => ({
              ...prevState,
              email: event.target.value,
            }))
          }
        />

        <label className="py-1" htmlFor="responsavel">
          Telefone
        </label>
        <TextField
          id="nome"
          variant="outlined"
          value={editUsuario.telefone}
          onChange={(event) =>
            setEditUsuario((prevState) => ({
              ...prevState,
              telefone: event.target.value,
            }))
          }
        />

        <button
          onClick={(event) => ButtonEditAluno(event, idUsuario)}
          className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold mt-4"
        >
          Atualizar
        </button>
      </Box>
    </>
  );
};

export default EditUsuario;
