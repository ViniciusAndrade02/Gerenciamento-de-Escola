export interface NoticiaResponse {
  id?: string | null;
  titulo: string;
  conteudo: string;
  imagemUrl: string;
  dataPublicacao: any;
}

export interface PutNoticiaResponse {
  titulo: string;
  conteudo: string;
  dataPublicacao: any;
  imagemUrl: string;
  usuarioId: string | null;
}

export interface CardapioResponse {
  id: number;
  diaSemana: string;
  conteudo: string;
}
