import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTurmaDelete } from "../../../hooks/Response/TurmaHook/DeletaTurma";

interface DeleteTurma {
  abrirDeleteTurma: boolean;
  setAbrirDeleteTurma: any;
  idTurmaSelect: string;
  setIdTurmaSelect: any;
}

const DeleteTurma = ({
  abrirDeleteTurma,
  setAbrirDeleteTurma,
  idTurmaSelect,
  setIdTurmaSelect,
}: DeleteTurma) => {

  const {mutate} = useTurmaDelete()


  const handleClose = () => {
    setIdTurmaSelect("");
    setAbrirDeleteTurma(false);
  };

  const DeletarTurma = () => {
    mutate(idTurmaSelect)
    handleClose()
  };
  return (
    <>
      <Dialog
        open={abrirDeleteTurma}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "50%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">Deletar Turma</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja deletar essa Turma?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={DeletarTurma} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTurma;
