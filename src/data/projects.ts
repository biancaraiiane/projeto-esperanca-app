export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  galleryImages: string[];
  description: string[];
}

export const projects: ProjectItem[] = [
  {
    id: "1",
    slug: "dia-das-maes",
    title: "Atividades com as crianças sobre o Dia das Mães",
    excerpt: "Atividades com as crianças sobre o Dia das Mães",
    coverImage: "/projetos/projeto-1.png",
    galleryImages: [
      "/projetos/projeto-1.png",
      "/projetos/projeto-2.png",
      "/projetos/projeto-3.png",
    ],
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Esse texto pode ser substituído pela história real do projeto.",
    ],
  },
  {
    id: "2",
    slug: "conscientizacao-criancas",
    title: "Conscientização das crianças da importância...",
    excerpt: "Conscientização das crianças da importância...",
    coverImage: "/projetos/projeto-2.png",
    galleryImages: [
      "/projetos/projeto-2.png",
      "/projetos/projeto-1.png",
      "/projetos/projeto-3.png",
    ],
    description: [
      "Aqui você pode escrever a história desse projeto, explicando o objetivo, como aconteceu, quem participou e qual impacto gerou para as crianças.",
      "Também pode adicionar mais parágrafos no array description, e eles aparecerão automaticamente na página.",
    ],
  },
  {
    id: "3",
    slug: "oficina-educativa",
    title: "Oficina educativa com as crianças",
    excerpt: "Oficina educativa com as crianças",
    coverImage: "/projetos/projeto-3.png",
    galleryImages: [
      "/projetos/projeto-3.png",
      "/projetos/projeto-1.png",
      "/projetos/projeto-2.png",
    ],
    description: [
      "Descrição da oficina educativa. Substitua esse texto pelo conteúdo real do Projeto Esperança.",
      "Você pode usar quantos parágrafos quiser nesse array.",
    ],
  },
];