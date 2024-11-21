import { Button, ButtonGroup } from "@mui/material";
import CadastrarUsuarios from "../../components/Elements/Usuarios/CadastrarUsuarios";
import ShowUsuarios from "../../components/Elements/Usuarios/ShowUsuarios";
import { useGetUsuarios } from "../../hooks/Response/Usuario/GetUsuario";
import { useState } from "react";

const Cadastrar = () => {
  const { data, status } = useGetUsuarios();
  const [showComponent, setShowComponent] = useState({
    mostrarUsuarios: true,
    cadastrar: false,
  });

  const mudarComponent = (mudar: string) => {
    if (mudar === "usuario") {
      setShowComponent((prevState) => ({
        ...prevState,
        mostrarUsuarios: true,
        cadastrar: false,
      }));
    }
    if (mudar === "cadastrar") {
      setShowComponent((prevState) => ({
        ...prevState,
        mostrarUsuarios: false,
        cadastrar: true,
      }));
    }
  };

  return (
    <>
      <ButtonGroup
        className="mb-4"
        variant="contained"
        aria-label="Basic button group"
      >
        <Button onClick={() => mudarComponent("usuario")}>Usuarios</Button>
        <Button onClick={() => mudarComponent("cadastrar")}>Cadastrar</Button>
      </ButtonGroup>
      {showComponent.cadastrar && <CadastrarUsuarios />}
      {status == "success" && showComponent.mostrarUsuarios && (
        <ShowUsuarios data={Array.isArray(data) ? [...data] : []} />
      )}
    </>
  );
};

export default Cadastrar;
