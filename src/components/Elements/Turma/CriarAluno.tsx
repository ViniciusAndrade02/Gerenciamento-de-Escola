import { FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete, Box, TextField } from "@mui/material";

const CriarAluno = () => {
  const [open, setOpen] = useState(false);
  const [createAluno, setCreateAluno] = useState({
    nome: "",
    dataNascimento: "",
    matricula: "",
    turmaId: "",
    paiId: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const PostCreateAluno = (event:FormEvent) => {
    event.preventDefault()
    console.log(createAluno)
  }

  const GetTodosPai =  () => {
    console.log('Oie')
  }

  const top100Films = [
    { paiId: "The Shawshank Redemption" },
    { paiId: "The Godfather" },
    { paiId: "The Godfather: Part II" },
    { paiId: "The Dark Knight" },
    { paiId: "12 Angry Men" },
    { paiId: "Schindler's List" },
    { paiId: "Pulp Fiction" },
  ];
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
              <Autocomplete
                disablePortal
                sx={{ width: "100%" }}
                options={top100Films.map((film) => film.paiId)}
                onChange={(_, newValue) =>
                  setCreateAluno((prevState) => ({
                    ...prevState,
                    paiId: newValue || "", // Atualiza o paiId com o valor selecionado
                  }))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Movie" onFocus={GetTodosPai} />
                )}
              />
              <label className="py-1" htmlFor="responsavel">
                Nome:
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
                className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold"
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
