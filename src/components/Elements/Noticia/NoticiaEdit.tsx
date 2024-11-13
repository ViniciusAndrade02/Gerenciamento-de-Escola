import { Box, Button, Divider, TextField } from "@mui/material";
import { FormEvent, useContext, useState } from "react";
import { useUpdateNoticia } from "../../../hooks/Response/NoticiaHook/UpdateNoticia";
import { AuthContext } from "../../../context/Auth";
import axios from "axios";

interface NoticiaEdit {
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl: any;
  idNoticia: string;
}

const NoticiaEdit = ({
  titulo,
  conteudo,
  dataPublicacao,
  imagemUrl,
  idNoticia,
}: NoticiaEdit) => {
  const { user, token } = useContext(AuthContext);
  const [editNoticia, setEditNoticia] = useState({
    usuarioId: user.id,
    titulo: titulo,
    conteudo: conteudo,
    dataPublicacao: dataPublicacao,
    imagemUrl: imagemUrl,
  });
  console.log(editNoticia.imagemUrl);
  const { mutate } = useUpdateNoticia({ idNoticia, data: editNoticia });

  async function editNoticiaId(event: FormEvent) {
    event.preventDefault();
    if (
      editNoticia.titulo === titulo &&
      editNoticia.conteudo == conteudo &&
      editNoticia.dataPublicacao == dataPublicacao &&
      editNoticia.imagemUrl == imagemUrl
    ) {
      alert("Por favor,altere algo para alterar");
    } else {
      mutate();
    }
  }

  function handleChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const imagemUrl = file;
      setEditNoticia({
        ...editNoticia,
        imagemUrl,
      });
    }
  }

  const renderImagePreview = () => {
    if (editNoticia.imagemUrl) {
      if (editNoticia.imagemUrl instanceof Blob) {
        return (
          <img
            src={URL.createObjectURL(editNoticia.imagemUrl)}
            alt="Preview"
            className="w-screen h-full object-cover absolute rounded-xl"
          />
        );
      }
      return (
        <img
          src={editNoticia.imagemUrl}
          alt="Preview"
          className="w-screen h-full object-cover absolute rounded-xl"
        />
      );
    }

    return null;
  };
  return (
    <>
      <Divider textAlign="left"></Divider>
      <h1 className="text-2xl mt-4">Edite essa Noticia:</h1>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <div className="flex flex-col ">
          <label className="py-1" htmlFor="responsavel">
            Titulo
          </label>
          <TextField
            id="titulo"
            variant="outlined"
            value={editNoticia.titulo}
            onChange={(event) =>
              setEditNoticia((prevState) => ({
                ...prevState,
                titulo: event.target.value,
              }))
            }
          />
          {/* <label className="py-1" htmlFor="responsavel">
            Data
          </label>
          <TextField
            id="titulo"
            variant="outlined"
            value={editNoticia.dataPublicacao}
            onChange={(event) =>
              setEditNoticia((prevState) => ({
                ...prevState,
                dataPublicacao: event.target.value,
              }))
            }
          /> */}
        </div>

        <div className="flex flex-col ">
          <label className="py-1" htmlFor="responsavel">
            Contéudo
          </label>
          <TextField
            id="conteudo"
            variant="outlined"
            value={editNoticia.conteudo}
            onChange={(event) =>
              setEditNoticia((prevState) => ({
                ...prevState,
                conteudo: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-col my-2">
          <p>Edite a Foto:</p>
          <Button
            className="w-60 h-[14.1rem]"
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
            {editNoticia.imagemUrl ? (
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
              name="img"
            />
          </Button>
        </div>

        <button
          onClick={editNoticiaId}
          className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold"
        >
          Atualizar
        </button>
      </Box>
    </>
  );
};

export default NoticiaEdit;
