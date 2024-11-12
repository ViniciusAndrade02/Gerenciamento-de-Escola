import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Esquema de validação com yup
const schema = yup.object().shape({
  titulo: yup.string().required("O título é obrigatório"),
  conteudo: yup.string().required("O conteúdo é obrigatório"),
  imagemUrl: yup.string().required("A imagem é obrigatória"),
});

const NoticiaCreate = () => {
  const [open, setOpen] = useState(false);
  const [createNoticia, setCreateNoticia] = useState({
    titulo: "",
    conteudo: "",
    imagemUrl: "",
  });

  // Configuração do react-hook-form com yup
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: createNoticia,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSend = (data:any) => {
    console.log("Dados enviados:", data);
    setOpen(false);
  };

  const handleChange = (event:any) => {
    const file = event.target.files[0];
    if (file) {
      const imagemUrl = URL.createObjectURL(file);
      setValue("imagemUrl", imagemUrl, { shouldValidate: true });
      setCreateNoticia((prev) => ({ ...prev, imagemUrl }));
    }
  };

  const renderImagePreview = () =>
    createNoticia.imagemUrl ? (
      <img
        src={createNoticia.imagemUrl}
        alt="Preview"
        className="w-screen h-full object-cover absolute rounded-xl"
      />
    ) : null;

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Criar Notícia
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ "& .MuiDialog-paper": { width: "70%", maxWidth: "none" } }}
      >
        <DialogTitle id="alert-dialog-title">
          <h1>Criar Uma Notícia:</h1>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              onSubmit={handleSubmit(handleSend)}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="py-1" htmlFor="titulo">
                Título
              </label>
              <Controller
                name="titulo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.titulo}
                    helperText={errors.titulo?.message}
                  />
                )}
              />

              <label className="py-1" htmlFor="conteudo">
                Conteúdo
              </label>
              <Controller
                name="conteudo"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    error={!!errors.conteudo}
                    helperText={errors.conteudo?.message}
                  />
                )}
              />

              <p>Edite a Foto:</p>
              <Button
                className="w-full h-[14.1rem]"
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "transparent",
                  color: "black",
                  borderRadius: "0.75rem",
                  border: "2px solid #E2E2E2",
                  "&:hover": {
                    backgroundColor: "#EFEFEF",
                  },
                }}
              >
                {renderImagePreview()}
                {createNoticia.imagemUrl ? (
                  <p
                    style={{ backgroundColor: "rgba(148, 163, 184, 0.5)" }}
                    className="absolute font-bold text-white rounded-lg p-2 text-sm capitalize"
                  >
                    Alterar Imagem
                  </p>
                ) : (
                  "Upload Imagem"
                )}
                <input
                  type="file"
                  accept="image/png"
                  onChange={handleChange}
                  hidden
                  name="imagemUrl"
                />
              </Button>
              {errors.imagemUrl && (
                <p style={{ color: "red" }}>{errors.imagemUrl.message}</p>
              )}
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Button onClick={handleSubmit(handleSend)} autoFocus>
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NoticiaCreate;
