import { useCardapio } from "../../hooks/Response/Cardapio/Cardapio";
import CardapioCard from "../../components/Elements/CardapioCard";

const CardapioAdmin = () => {
  const { data, isLoading } = useCardapio();
  console.log(data);
  return (
    <>
      <>
        {!isLoading &&
          data &&
          Object.values(data).map((item, index) => {
            let conteudoTexto = item.conteudo;
            try {
              const conteudoObjeto = JSON.parse(item.conteudo);
              conteudoTexto = conteudoObjeto.conteudo;
            } catch (error) {
              console.warn("Conteúdo não é JSON válido:", item.conteudo);
            }
            return (
              <CardapioCard
                key={index}
                diaSemana={item.diaSemana}
                conteudo={conteudoTexto}
              />
            );
          })}
        {isLoading && <p>Carregando...</p>}
      </>
    </>
  );
};

export default CardapioAdmin;
