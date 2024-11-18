import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useGetUsuarios } from "../../../hooks/Response/Usuario/GetUsuario";
import { PostNewTurmas, UsuarioResponse } from "../../../api/InterfaceApi";
import { usePostNewTurma } from "../../../hooks/Response/TurmaHook/PostNewTurma";

const CriarTurma = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetUsuarios();
  const [todosProfessores, setTodosProfessores] = useState<
    { label: string; id?: string }[]
  >([]);
  const { mutate } = usePostNewTurma();
  const [criarTurma, setCriarTurma] = useState<PostNewTurmas>({
    nome: "",
    descricao: "",
    professorId: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const GetTodosProfessores = () => {
    if (data) {
      const TodosOsProfessores = Object.values(data)
        .filter((item: UsuarioResponse) => item.role === "PROFESSOR")
        .map((item: UsuarioResponse) => ({ label: item.nome, id: item.id }));

      setTodosProfessores(TodosOsProfessores);
    }
  };

  const buttonCriarTurma = (event: FormEvent) => {
    event.preventDefault();

    const campoVazio = Object.values(criarTurma).some(
      (value) => value.trim() === ""
    );

    if (campoVazio) {
      alert("Todos os campos sao obrigatorio");
      return;
    }

    mutate(criarTurma);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Turma
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Criar uma Turma</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="py-1" htmlFor="responsavel">
                Selecione um Professor:
              </label>
              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                options={todosProfessores}
                getOptionLabel={(option) => option.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                onChange={(_, value) => {
                  if (value) {
                    setCriarTurma((prev) => ({
                      ...prev,
                      professorId: value.id || "",
                    }));
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} onFocus={GetTodosProfessores} />
                )}
              />

              <label className="py-1" htmlFor="responsavel">
                Nome:
              </label>
              <TextField
                id="nome"
                variant="outlined"
                value={criarTurma.nome}
                onChange={(event) =>
                  setCriarTurma((prevState: any) => ({
                    ...prevState,
                    nome: event.target.value,
                  }))
                }
              />

              <label className="py-1" htmlFor="responsavel">
                Descrição:
              </label>
              <TextField
                id="nome"
                variant="outlined"
                value={criarTurma.descricao}
                onChange={(event) =>
                  setCriarTurma((prevState: any) => ({
                    ...prevState,
                    descricao: event.target.value,
                  }))
                }
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={buttonCriarTurma} autoFocus>
            Criar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CriarTurma;
