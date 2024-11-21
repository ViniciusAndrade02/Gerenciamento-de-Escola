import { useParams } from "react-router-dom";
import NoticiaCard from "../../components/Elements/Noticia/NoticiaCard";
import { useNoticia } from "../../hooks/Response/NoticiaHook/Noticias";
import NoticiaCreate from "../../components/Elements/Noticia/NoticiaCreate";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const NoticiaAdmin = () => {
  const { data, isLoading } = useNoticia();
  const [noticias, setNoticias] = useState<any[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (!data) return;

    setNoticias(
      Object.values(data)
        .map((item) => ({
          ...item,
          dataPublicacao: new Date(item.dataPublicacao), // Data para ordenação
          dataOrdenada: format(
            new Date(item.dataPublicacao),
            "dd/MM/yyyy HH:mm:ss"
          ),
        }))
        .sort((a, b) => b.dataPublicacao - a.dataPublicacao) // Ordena pela data
    );
  }, [data]);

  return (
    <>
      {!id && <NoticiaCreate />}
      {!isLoading &&
        data &&
        noticias
          .filter((item) => !id || item.id === id)
          .map((item, index) => (
            <NoticiaCard
              key={index}
              conteudo={item.conteudo}
              titulo={item.titulo}
              dataPublicacao={item.dataOrdenada} 
              imagemUrl={item.imagemUrl}
              idNoticia={item.id}
            />
          ))}
      {isLoading && <p>Carregando...</p>}
    </>
  );
};

export default NoticiaAdmin;
