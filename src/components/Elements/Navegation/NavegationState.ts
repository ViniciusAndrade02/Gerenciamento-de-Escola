export interface Route {
  urlDefault:string
  urls: string[];
  namePage: string[];
  nameNavegation: string[]
}

export const Menu = {
  urlDefault:'menu',
  urls: ["cardapio", "perfil","Chat"],
  namePage: ["Noticias do Dia", "Cardápio da Semana", "Perfil","Chat"],
  nameNavegation:['Noticias','Cardápio','Perfil',"Chat",'Sair']
};

export const Admin = {
  urlDefault:'admin',
  urls: ["noticia", "cadastrar","cardapio","chat"],
  namePage: ["Turmas", "Noticia", "Usuarios",'Cardapio','Chat'],
  nameNavegation:['Turmas','Noticias','Usuários','Cardapio','Chat','Sair']
};
