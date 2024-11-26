import EditNoteIcon from "@mui/icons-material/EditNote";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { Box, TextField } from "@mui/material";
import { useUpdateCardapio } from "../../hooks/Response/Cardapio/UpdateCardapio";
interface CardapioCard {
  diaSemana: string;
  conteudo: string;
}

const CardapioCard = ({ diaSemana, conteudo }: CardapioCard) => {
  const { user } = useContext(AuthContext);
  const {mutate,status} = useUpdateCardapio()

  const [abrirConteudo, setAbrirConteudo] = useState<boolean>(false);
  const [semana,setSemana] = useState({
    semana: "",
  })
  const [informationConteudo, setInformationConteudo] = useState({
    conteudo: "",
  });

  const abrirEditConteudo = (semana: string, conteudo: string) => {

    setInformationConteudo((prev) => ({ ...prev, conteudo }));
    setSemana((prev) => ({ ...prev, semana }));
    setAbrirConteudo(!abrirConteudo);
  };

  useEffect(() => {
    if(status == "success"){
      setAbrirConteudo(!abrirConteudo);
    }
  },[status])

  const editConteudoSemana = (event:FormEvent) => {
    event.preventDefault()
    console.log(informationConteudo)
    console.log(semana)
    mutate({semana:semana.semana,data:informationConteudo})
   
  }

  return (
    <>
      <div className="w-auto bg-gray-300 flex-col p-3 rounded-lg mt-4 relative">
        <h1 className="text-xl font-medium ">
          {diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1).toLowerCase()}
        </h1>
        <p className="pt-1">
          {Object.values(conteudo).map((item, index) => (
            <span key={index}>{item}</span>
          ))}

          {user.role == "ADMIN" && (
            <EditNoteIcon
              className="absolute top-0 right-0 m-2 cursor-pointer"
              onClick={() => abrirEditConteudo(diaSemana, conteudo)}
            />
          )}
        </p>
      </div>

      {semana.semana == diaSemana && abrirConteudo && (
        <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
          <label className="py-1" htmlFor="responsavel">
            Mude o Conteudo:
          </label>
          <TextField
            id="conteudo"
            variant="outlined"
            value={informationConteudo.conteudo}
            onChange={(event) =>
              setInformationConteudo((prevState) => ({
                ...prevState,
                conteudo: event.target.value,
              }))
            }
          />
          <button
            onClick={(event) => editConteudoSemana(event)}
            className="col-span-2 bg-blue-300 rounded-lg py-4 font-semibold mt-4"
          >
            Editar
          </button>
        </Box>
      )}
    </>
  );
};

export default CardapioCard;
