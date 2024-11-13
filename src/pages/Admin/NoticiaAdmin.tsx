import { useParams } from "react-router-dom";
import NoticiaCard from "../../components/Elements/Noticia/NoticiaCard";
import { useNoticia } from "../../hooks/Response/NoticiaHook/Noticias";
import NoticiaCreate from "../../components/Elements/Noticia/NoticiaCreate";

const NoticiaAdmin = () => {
  const { data, isLoading } = useNoticia();
  const { id } = useParams();

  return (
    <>
      {!id && <NoticiaCreate />}
      {!isLoading &&
        data &&
        Object.values(data)
          .filter((item) => !id || item.id === id)
          .map((item, index) => (
            <NoticiaCard
              key={index}
              conteudo={item.conteudo}
              titulo={item.titulo}
              dataPublicacao={item.dataPublicacao}
              imagemUrl={item.imagemUrl}
              idNoticia={item.id}
            />
          ))}
      {isLoading && <p>Carregando...</p>}
    </>
  );
};

export default NoticiaAdmin;
