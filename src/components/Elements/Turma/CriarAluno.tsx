import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useGetUsuarios } from "../../../hooks/Response/Usuario/GetUsuario";
import { UsuarioResponse } from "../../../api/InterfaceApi";
import { usePostAlunoTurma } from "../../../hooks/Response/TurmaHook/PostAlunoTurma";
import { useNavigate, useParams } from "react-router-dom";
// import { UsuarioResponse } from "../../../api/InterfaceApi";

interface CriarALuno{
  turmaId:string
}

const CriarAluno = ({turmaId}:CriarALuno) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetUsuarios();
  const {mutate}= usePostAlunoTurma()
  const [createAluno, setCreateAluno] = useState({
    nome: "",
    dataNascimento: "",
    matricula: "",
    turmaId: turmaId,
    paiId: "",
  });
  const [todosPais, setTodosPais] = useState<{ label: string,id?:string }[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PostCreateAluno = (event: FormEvent) => {
    event.preventDefault();
    mutate(createAluno)
    navigate('/admin')
  };

  const GetTodosPai = () => {
    if (data) {
      const TodosOsPais = Object.values(data)
        .filter((item: UsuarioResponse) => item.role === "PAI")
        .map((item: UsuarioResponse) => ({ label: item.nome,id:item.id }));

      setTodosPais(TodosOsPais);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adicionar ALuno
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Adicione um Aluno:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", width: "90%" }}
            >
              <label className="py-1" htmlFor="responsavel">
                Selecione um Pai:
              </label>
              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                options={todosPais}
                getOptionLabel={(option) => option.label || ""} 
                isOptionEqualToValue={(option, value) => option.label === value.label}
                onChange={(_, value) => {
                  if (value) {
                    setCreateAluno((prev) => ({
                      ...prev,
                      paiId: value.id || ""
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onFocus={GetTodosPai}
                  />
                )}
              />
              <label className="py-1" htmlFor="responsavel">
                Nome do ALuno:
              </label>
              <TextField
                id="nome"
                variant="outlined"
                value={createAluno.nome}
                onChange={(event) =>
                  setCreateAluno((prevState: any) => ({
                    ...prevState,
                    nome: event.target.value,
                  }))
                }
              />

              <label id="dataNascimento" className="py-1" htmlFor="responsavel">
                Data de Nascimento:
              </label>
              <TextField
                id="dataNascimento"
                variant="outlined"
                value={createAluno.dataNascimento}
                onChange={(event) =>
                  setCreateAluno((prevState: any) => ({
                    ...prevState,
                    dataNascimento: event.target.value,
                  }))
                }
              />

              <label className="py-1" htmlFor="responsavel">
                Matricula:
              </label>
              <TextField
                id="matricula"
                variant="outlined"
                value={createAluno.matricula}
                onChange={(event) =>
                  setCreateAluno((prevState: any) => ({
                    ...prevState,
                    matricula: event.target.value,
                  }))
                }
              />

              <button
                onClick={PostCreateAluno}
                className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold mt-4"
              >
                Criar
              </button>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleClose} autoFocus>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CriarAluno;
