import { useCardapio } from "../../hooks/Response/Cardapio";
import CardapioCard from "../../components/Elements/CardapioCard";

const CardapioAdmin = () => {

  const { data, isLoading } = useCardapio();
  console.log(data)
  return (
    <>
      <>
        {!isLoading &&
          data &&
          Object.values(data).map((item, index) => {
            return (
              <CardapioCard
                key={index}
                diaSemana={item.diaSemana}
                conteudo={item.conteudo}
              />
            );
          })}
        {isLoading && <p>Carregando...</p>}
      </>
    </>
  );
};

export default CardapioAdmin;
