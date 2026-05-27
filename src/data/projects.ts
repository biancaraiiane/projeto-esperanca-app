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
    coverImage: "/dia-das-maes/projeto-dia-das-maes1.jpeg",
    galleryImages: [
      "/dia-das-maes/projeto-dia-das-maes2.jpeg",
      "/dia-das-maes/projeto-dia-das-maes3.jpeg",
      "/dia-das-maes/projeto-dia-das-maes4.jpeg",
    ],
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Esse texto pode ser substituído pela história real do projeto.",
    ],
  },
  {
    id: "2",
    slug: "higiene-bucal",
    title: "Intervenção Unit - higiene bucal",
    excerpt: "Intervenção Unit - higiene bucal",
    coverImage: "/unit-higiene-bucal/higiene-bucal1.jpeg",
    galleryImages: [
      "/unit-higiene-bucal/higiene-bucal2.jpeg",
      "/unit-higiene-bucal/higiene-bucal3.jpeg",
      "/unit-higiene-bucal/higiene-bucal4.jpeg",
    ],
    description: [
      "Aqui você pode escrever a história desse projeto, explicando o objetivo, como aconteceu, quem participou e qual impacto gerou para as crianças.",
      "Também pode adicionar mais parágrafos no array description, e eles aparecerão automaticamente na página.",
    ],
  },
  {
    id: "3",
    slug: "maio-laranja",
    title: "Maio laranjas",
    excerpt: "Maio laranja",
    coverImage: "/maio-laranja/maio-laranja1.jpeg",
    galleryImages: [
      "/maio-laranja/maio-laranja2.jpeg",
      "/maio-laranja/maio-laranja3.jpeg",
      "/maio-laranja/maio-laranja4.jpeg",
    ],
    description: [
      "Descrição da oficina educativa. Substitua esse texto pelo conteúdo real do Projeto Esperança.",
      "Você pode usar quantos parágrafos quiser nesse array.",
    ],
  },
];