import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useUsuarioDelete } from "../../../hooks/Response/Usuario/DeleteUsuario";

interface AlunoUsuario {
  setAbrirDelete: any;
  abrirDelete: boolean;
  idUsuarioDelete?: string;
}

const DeletarUsuario = ({
  setAbrirDelete,
  abrirDelete,
  idUsuarioDelete,
}: AlunoUsuario) => {
  const { mutate } = useUsuarioDelete();

  const handleClose = () => {
    setAbrirDelete(false);
  };

  const deletarAluno = () => {
    mutate(idUsuarioDelete);
    alert("Deletado com sucesso");
    handleClose();
  };

  return (
    <>
      <Dialog
        open={abrirDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "50%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">Deletar Aluno</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir esse aluno?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>fechar</Button>
          <Button onClick={deletarAluno} autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletarUsuario;
