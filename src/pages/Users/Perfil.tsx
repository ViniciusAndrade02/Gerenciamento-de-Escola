import { TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";
import { useGetUsuariosEspecifico } from "../../hooks/Response/Usuario/GetUsuarioEspecifico";


const Perfil = () => {

  const {user} = useContext(AuthContext)
  const {data} = useGetUsuariosEspecifico(user.id)
  console.log(data)
  console.log(user.id)


  return (
    <>
      <h1 className="text-2xl">Informações Pessoais</h1>
      <div className="grid grid-cols-2 space-x-6 my-2">
        <div className="flex flex-col space-y-2">
          <label htmlFor="responsavel">Responsável</label>
          <TextField
            id="responsavel"
            value={data?.nome}
            variant="outlined"
            disabled
          />

          <label htmlFor="email">Email</label>
          <TextField
            id="email"
            variant="outlined"
            value={data?.email}
            disabled
          />

          <label htmlFor="nascimento">Telefone</label>
          <TextField
            id="nascimento"
            variant="outlined"
            value={data?.telefone}
            disabled
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="telefone">Autoridade</label>
          <TextField
            id="telefone"
            variant="outlined"
            value={data?.role}
            disabled
          />

          <label htmlFor="nome-do-aluno">Nome do Aluno</label>
          <TextField
            id="nome-do-aluno"
            variant="outlined"

            disabled
          />

          <label htmlFor="matricula">Matrícula</label>
          <TextField
            id="matricula"
            variant="outlined"
            disabled
          />
        </div>
      </div>
    </>
  );
};

export default Perfil;
