import { Box, Divider, TextField } from "@mui/material";
import { FormEvent, useState } from "react";
import { useUpdateAluno } from "../../../hooks/Response/TurmaHook/UpdateAlunoTurma";
import { useNavigate } from "react-router-dom";

interface EditTurma {
  nome: string;
  matricula: string;
  dataNascimento: string;
  idAluno: string;
}

const EditTurma = ({ nome, matricula, dataNascimento, idAluno }: EditTurma) => {
  const [editALuno, setEditAluno] = useState({
    nome: nome,
    matricula: matricula,
    dataNascimento: dataNascimento,
  });
  const {mutate} = useUpdateAluno()
  const navigate = useNavigate()

  const ButtonEditAluno = (event: FormEvent, idAluno: string) => {
    event.preventDefault();
    if(nome != editALuno.nome || matricula != editALuno.matricula || dataNascimento != editALuno.dataNascimento){
      console.log(idAluno);
      mutate({idAluno,data:editALuno})
      navigate('/admin')
    }
  };

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
          value={editALuno.nome}
          onChange={(event) =>
            setEditAluno((prevState) => ({
              ...prevState,
              nome: event.target.value,
            }))
          }
        />

        <label className="py-1" htmlFor="responsavel">
          Matricula
        </label>
        <TextField
          id="nome"
          variant="outlined"
          value={editALuno.matricula}
          onChange={(event) =>
            setEditAluno((prevState) => ({
              ...prevState,
              matricula: event.target.value,
            }))
          }
        />

        <label className="py-1" htmlFor="responsavel">
          Nascimento:
        </label>
        <TextField
          id="nome"
          variant="outlined"
          value={editALuno.dataNascimento}
          onChange={(event) =>
            setEditAluno((prevState) => ({
              ...prevState,
              dataNascimento: event.target.value,
            }))
          }
        />

        <button
          onClick={(event) => ButtonEditAluno(event, idAluno)}
          className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold mt-4"
        >
          Atualizar
        </button>
      </Box>
    </>
  );
};

export default EditTurma;
