export interface NoticiaResponse {
  id?: string | null;
  titulo: string;
  conteudo: string;
  imagemUrl: any;
  dataPublicacao: any;
}

export interface PutNoticiaResponse {
  titulo: string;
  conteudo: string;
  dataPublicacao: any;
  imagemUrl: any;
  usuarioId: string | null;
}

export interface CardapioResponse {
  id: number;
  diaSemana: string;
  conteudo: string;
}

export interface Alunos {
  id: string;
  nome: string;
  dataNascimento: string;
  matricula: string;
}

export interface GetTurmasResponse {
  id: string;
  nome: string;
  descricao: string;
  alunos: Alunos[];
}

export interface PostAlunosTurmaEspecifica{
  nome:string,
  dataNascimento:string,
  matricula:string,
  turmaId:string,
  paiId:string
}

export interface PostNewTurmas{
  nome:string,
  descricao:string,
  professorId:string
}

export interface UsuarioResponse {
  id?:string
  nome: string;
  telefone: string;
  email: string;
  password: string;
  role: string;
}
