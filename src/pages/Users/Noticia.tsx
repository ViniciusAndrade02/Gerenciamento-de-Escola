import { useEffect, useState } from "react";
import NoticiaCard from "../../components/Elements/Noticia/NoticiaCard";
import { useNoticia } from "../../hooks/Response/NoticiaHook/Noticias";
import { format } from "date-fns";

const Noticia = () => {
  const { data, isLoading } = useNoticia();
  const [noticias, setNoticias] = useState<any[]>([]);

  useEffect(() => {
    if (!data) return;

    setNoticias(
      Object.values(data)
        .map((item) => ({
          ...item,
          dataPublicacao: new Date(item.dataPublicacao),
          dataOrdenada: format(
            new Date(item.dataPublicacao),
            "dd/MM/yyyy HH:mm:ss"
          ),
        }))
        .sort((a, b) => b.dataPublicacao - a.dataPublicacao) 
    );
  }, [data]);


  return (
    <>
      {!isLoading &&
        data &&
        Object.values(noticias).map((item, index) => (
          <NoticiaCard
            key={index}
            conteudo={item.conteudo}
            titulo={item.titulo}
            dataPublicacao={item.dataOrdenada}
            imagemUrl={item.imagemUrl}
            idNoticia=""
          />
        ))}
      {isLoading && <p>Carregando...</p>}
    </>
  );
};

export default Noticia;
