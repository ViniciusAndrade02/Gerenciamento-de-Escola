import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAlunoDelete } from "../../../hooks/Response/TurmaHook/DeleteAlunoTurma";
import { useNavigate } from "react-router-dom";

interface AlunoDelete{
  setAbrirDelete:any
  abrirDelete:boolean
  idAlunoDelete:string
}

const AlunoDelete = ({setAbrirDelete,abrirDelete,idAlunoDelete}:AlunoDelete) => {

  const {mutate} = useAlunoDelete()
  const navigate = useNavigate()

  const handleClose = () => {
    setAbrirDelete(false);
  };

  const deletarAluno = () => {
    mutate(idAlunoDelete)
    navigate('/admin')
  }

  return <>
  
      <Dialog
        open={abrirDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "50%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">
          Deletar Aluno
        </DialogTitle>
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
  
  </>;
};

export default AlunoDelete;
