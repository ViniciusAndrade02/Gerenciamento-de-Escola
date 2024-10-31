import React from "react";
interface NoticiaCard {
  titulo: string;
  conteudo: string;
  dataPublicacao: string;
  imagemUrl: string;
}

const NoticiaCard = ({
  titulo,
  conteudo,
  dataPublicacao,
  imagemUrl,
}: NoticiaCard) => {
  return (
    <>
      <div className="flex flex-col mx-10 mb-4 bg-gray-50">
        <img className="w-auto h-30 object-cover" src={imagemUrl} alt="" />

        <div className="flex justify-between px-2 mt-2">
          <h1 className="text-xl">{titulo}</h1>
          <span>{dataPublicacao}</span>
        </div>

        <p className="px-2 my-2">{conteudo}</p>
      </div>
    </>
  );
};

export default NoticiaCard;
