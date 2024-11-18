import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { usePostUsuario } from "../../hooks/Response/Usuario/PostNewUsuario";
import { UsuarioResponse } from "../../api/InterfaceApi";

const Cadastrar = () => {
  const [usuario, setUsuario] = useState<UsuarioResponse>({
    nome: "",
    telefone: "",
    email: "",
    password: "",
    role: "",
  });
  const { mutate, isSuccess } = usePostUsuario();

  const postUsuario = (event: FormEvent) => {
    event.preventDefault();
    mutate(usuario);

    if (!isSuccess) {
      alert("Usuario criado com sucesso");
    }

    setUsuario({
      nome: "",
      telefone: "",
      email: "",
      password: "",
      role: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <div className="flex flex-col">
          <label className="py-1" htmlFor="responsavel">
            Nome
          </label>
          <TextField
            id="nome"
            variant="outlined"
            value={usuario.nome}
            onChange={(event) =>
              setUsuario((prevState: any) => ({
                ...prevState,
                nome: event.target.value,
              }))
            }
          />

          <label className="py-1" htmlFor="responsavel">
            Email
          </label>
          <TextField
            id="nome"
            variant="outlined"
            value={usuario.email}
            type="email"
            onChange={(event) =>
              setUsuario((prevState: any) => ({
                ...prevState,
                email: event.target.value,
              }))
            }
          />

          <label className="py-1" htmlFor="responsavel">
            Selecione a permissão:
          </label>

          <RadioGroup
            value={usuario.role}
            onChange={(event) =>
              setUsuario((prevState) => ({
                ...prevState,
                role: event.target.value,
              }))
            }
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="ADMIN"
              control={<Radio />}
              label="Administrador"
            />
            <FormControlLabel
              value="PROFESSOR"
              control={<Radio />}
              label="Professor"
            />
            <FormControlLabel
              value="PAI"
              control={<Radio />}
              label="Responsável"
            />
          </RadioGroup>
        </div>

        <div className="flex flex-col">
          <label className="py-1" htmlFor="responsavel">
            Telefone
          </label>
          <TextField
            id="nome"
            variant="outlined"
            type="number"
            value={usuario.telefone}
            onChange={(event) =>
              setUsuario((prevState: any) => ({
                ...prevState,
                telefone: event.target.value,
              }))
            }
          />

          <label className="py-1" htmlFor="responsavel">
            Senha:
          </label>

          <TextField
            id="nome"
            variant="outlined"
            value={usuario.password}
            onChange={(event) =>
              setUsuario((prevState: any) => ({
                ...prevState,
                password: event.target.value,
              }))
            }
          />
        </div>

        <button
          onClick={postUsuario}
          className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold"
        >
          Criar
        </button>
      </Box>
    </>
  );
};

export default Cadastrar;
