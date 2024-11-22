import { useEffect, useState } from "react";
import { UsuarioResponse } from "../../../api/InterfaceApi";
import { Button, ButtonGroup } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import DeletarUsuario from "./DeletarUsuario";
import EditUsuario from "./EditUsuario";

interface ShowUsuarios {
  data?: UsuarioResponse[];
}

const ShowUsuarios = ({ data }: ShowUsuarios) => {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[] | undefined>(data);
  const [abrirDelete, setAbrirDelete] = useState<boolean>(false);
  const [abrirEdit, setAbrirEdit] = useState<boolean>(false);
  const [idUsuario, setIdUsuario] = useState<string>();

  useEffect(() => {
    setUsuarios(data);
  }, [data]);

  const buscarRole = (role: string) => {
    switch (role) {
      case "TODOS":
        setUsuarios(data);
        break;
      case "ADMIN":
        setUsuarios(data?.filter((x) => x.role == role));
        break;
      case "PROFESSOR":
        setUsuarios(data?.filter((x) => x.role == role));
        break;
      case "PAI":
        setUsuarios(data?.filter((x) => x.role == role));
        break;
    }
  };

  const editUsuario = (idUsuario?: string) => {
    setIdUsuario(idUsuario);
    setAbrirEdit(!abrirEdit);
  };

  const deleteUsuario = (idUsuario?: string) => {
    setIdUsuario(idUsuario);
    setAbrirDelete(true);
  };

  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button onClick={() => buscarRole("TODOS")}>Todos</Button>
        <Button onClick={() => buscarRole("ADMIN")}>Admin</Button>
        <Button onClick={() => buscarRole("PROFESSOR")}>Professores</Button>
        <Button onClick={() => buscarRole("PAI")}>Responsáveis</Button>
      </ButtonGroup>

      <div className="p-6 bg-gray-100 rounded-lg shadow-md mt-4">
        {Object.values(usuarios ?? {}).length === 0 ? (
          <p className="text-center  ">Nenhum Usuario Encontrado</p>
        ) : (
          Object.values(usuarios ?? {}).map((item: UsuarioResponse, index) => (
            <>
              <div
                key={index}
                className="mb-4 p-4 border border-gray-300 rounded-md bg-white shadow-sm relative"
              >
                <h1 className="text-xl font-semibold text-gray-800">
                  {item.nome}
                </h1>
                <p className="text-sm text-gray-600">Email: {item.email}</p>
                <p className="text-sm text-gray-600">
                  Telefone: {item.telefone}
                </p>
                <p className="text-sm text-gray-600">Prioridade: {item.role}</p>

                <div className="absolute top-0 right-0 p-2">
                  <EditNoteIcon
                    className="cursor-pointer"
                    onClick={() => editUsuario(item.id)}
                  />
                  <DeleteIcon
                    className="cursor-pointer"
                    onClick={() => deleteUsuario(item.id)}
                  />
                </div>

                {idUsuario == item.id && abrirEdit && (
                  <EditUsuario
                    email={item.email}
                    idUsuario={item.id}
                    nome={item.nome}
                    telefone={item.telefone}
                    setAbrirEdit={setAbrirEdit}
                  />
                )}
              </div>
            </>
          ))
        )}
        <DeletarUsuario
          abrirDelete={abrirDelete}
          setAbrirDelete={setAbrirDelete}
          idUsuarioDelete={idUsuario}
        />
      </div>
    </>
  );
};

export default ShowUsuarios;
