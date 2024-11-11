import { useLocation, useNavigate, useParams } from "react-router-dom";
import NoticiaCard from "../../components/Elements/NoticiaCard";
import { useNoticia } from "../../hooks/Response/Noticias";
import { useEffect } from "react";

const NoticiaAdmin = () => {
  const { data, isLoading } = useNoticia();
  const location = useLocation();
  const { id } = useParams();
  console.log(location.pathname);

  return (
    <>
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
