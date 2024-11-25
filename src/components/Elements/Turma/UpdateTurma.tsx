import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { useUpdateTurma } from "../../../hooks/Response/TurmaHook/UploadTurma";

interface Turma {
  nome: string;
  descricao: string;
  id?: string;
}

interface UpdateTurma {
  abrirUpdate: boolean;
  setAbrirUpdate: any;
  itensTurma: Turma;
}

const UpdateTurma = ({
  abrirUpdate,
  setAbrirUpdate,
  itensTurma,
}: UpdateTurma) => {
  const { mutate } = useUpdateTurma();

  useEffect(() => {
    setEditTurmas({
      nome: itensTurma?.nome || "",
      descricao: itensTurma?.descricao || "",
    });
  }, [itensTurma]);

  const [editTurma, setEditTurmas] = useState<Turma>({
    nome: itensTurma?.nome || "",
    descricao: itensTurma?.descricao || "",
  });


  const handleClose = () => {
    setAbrirUpdate(false);
    setEditTurmas({
      nome: "",
      descricao: "",
    });
  };

  const EditarTurma = () => {
    if (itensTurma.id) {
      mutate({ idTurma: itensTurma.id, data: editTurma });
    }
    handleClose()
  };




  return (
    <>
      <Dialog
        open={abrirUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "50%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">Editar Turma</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{display:'flex',flexDirection:'column',gap:'4px'}}>

            <label className="py-1" htmlFor="responsavel">
              Nome:
            </label>
            <TextField
              id="nome"
              variant="outlined"
              value={editTurma.nome}
              onChange={(event) =>
                setEditTurmas((prevState: any) => ({
                  ...prevState,
                  nome: event.target.value,
                }))
              }
            />

            <label className="" htmlFor="responsavel">
              Descricao:
            </label>
            <TextField
              id="nome"
              variant="outlined"
              value={editTurma.descricao}
              onChange={(event) =>
                setEditTurmas((prevState: any) => ({
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
          <Button onClick={EditarTurma} autoFocus>
            Editar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateTurma;
