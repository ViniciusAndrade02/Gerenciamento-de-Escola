export interface NoticiaResponse {
  id: string;
  titulo: string;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: Date;
}

export interface CardapioResponse {
  id: number;
  diaSemana: string;
  conteudo: string;

}