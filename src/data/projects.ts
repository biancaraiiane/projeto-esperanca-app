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
      "A semana das mães foi marcada por muito amor, acolhimento e valorização do autocuidado. Durante esse período, buscamos proporcionar momentos especiais de cuidado, escuta e relaxamento, reconhecendo a importância de cada mãe e responsável em nosso projeto. Também foi um momento de homenagem e demonstração de carinho, fortalecendo vínculos e promovendo bem-estar. As atividades realizadas trouxeram leveza, troca de experiências e muitos momentos afetivos para todas as participantes.",
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
      "Tivemos mais um momento de conhecimento e aprendizagem com os alunos extensionistas da Unit, que contribuíram de forma significativa para o desenvolvimento das nossas atividades. Com carinho e atenção, eles reforçaram conteúdos importantes e apresentaram novas temáticas aos alunos.",
      "Esses encontros proporcionam experiências enriquecedoras, despertando curiosidade, participação e troca de conhecimentos. Além de fortalecer o aprendizado, os momentos com os extensionistas tornam as atividades ainda mais dinâmicas e acolhedoras.",
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
      "Durante a campanha Maio Laranja, realizamos atividades voltadas à conscientização e ao combate da violência e do abuso sexual de crianças e adolescentes. As ações promoveram diálogo, informação e reflexão de maneira acessível e cuidadosa.",
      "Ao longo das atividades, reforçamos a importância da proteção, do cuidado e da escuta das crianças e adolescentes, incentivando a construção de ambientes mais seguros e acolhedores para todos.",
    ],
  },
];