import type { IconType } from "react-icons";
import {
  FiFileText,
  FiBarChart2,
  FiDollarSign,
  FiBriefcase,
  FiUsers,
  FiFolder,
} from "react-icons/fi";

export type TransparencyColumn = {
  key: string;
  label: string;
  isFile?: boolean;
};

export type TransparencyDocument = {
  id: string;
  year?: string;
  name?: string;
  type?: string;
  description?: string;
  value?: string;
  startDate?: string;
  endDate?: string;
  expenseType?: string;
  fileUrl?: string;
  explanatoryNoteUrl?: string;
  disabled?: boolean;
};

export type TransparencyCategoryVariant =
  | "yellow"
  | "purple"
  | "green"
  | "cyan"
  | "pink"
  | "red";

export type TransparencyCategory = {
  id: string;
  title: string;
  description: string;
  variant: TransparencyCategoryVariant;
  icon: IconType;
  columns: TransparencyColumn[];
  documents: TransparencyDocument[];
};

export const transparencyCategories: TransparencyCategory[] = [
  {
    id: "institutional",
    title: "Informações Institucionais",
    description: "Documentos e informações sobre a instituição.",
    variant: "yellow",
    icon: FiFileText,
    columns: [
      { key: "year", label: "Ano" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
    ],
    documents: [
      {
        id: "1",
        year: "2025",
        name: "CNPJ",
        type: "Certidão Nacional de Pessoa Jurídica",
        fileUrl: "/transparencia/informacoes-institucionais/CNPJ.pdf",
      },
      {
        id: "2",
        year: "2024",
        name: "Ata da Eleição da Diretoria",
        type: "Atas e Estatuto",
      },
      {
        id: "3",
        year: "2021",
        name: "Registro CMDCA - Conselho Municipal dos Direitos da Criança e do Adolescente",
        type: "Certificado de Registro",
        fileUrl: "/transparencia/informacoes-institucionais/registro-cmdca.pdf",
      },
      {
        id: "4",
        year: "2012",
        name: "Registro CMAS - Conselho Municipal de Assistência Social",
        type: "Certificado de Registro",
        fileUrl: "/transparencia/informacoes-institucionais/registro-cmas.pdf",
      },
      {
        id: "5",
        year: "2008",
        name: "Credenciamento da Sociedade Civil - OSCIP",
        type: "Credenciamento",
        fileUrl: "/transparencia/informacoes-institucionais/OSCIP.pdf",
      },
      {
        id: "6",
        year: "2008",
        name: "Reconhecimento de Utilidade Pública",
        type: "Reconhecimento",
        fileUrl: "/transparencia/informacoes-institucionais/utilidade-publica.pdf",
      },
      {
        id: "7",
        name: "Estatuto do Projeto Esperança",
        type: "Estatuto do Projeto",
      },
    ],
  },
  {
    id: "impact",
    title: "Impacto Social",
    description: "Relatórios de atividades e impacto social do Projeto Esperança.",
    variant: "purple",
    icon: FiBarChart2,
    columns: [
      { key: "year", label: "Ano" },
      { key: "name", label: "Nome" },
    ],
    documents: [
      {
        id: "1",
        year: "2024",
        name: "Relatório de Atividades",
      },
      {
        id: "2",
        year: "2023",
        name: "Relatório de Atividades",
      },
      {
        id: "3",
        year: "2022",
        name: "Relatório de Atividades",
      },
      {
        id: "4",
        year: "2021",
        name: "Relatório de Atividades",
      },
      {
        id: "5",
        year: "2020",
        name: "Relatório de Atividades",
        fileUrl: "/transparencia/impacto-social/impacto-social2020.pdf",
      },
    ],
  },
  {
    id: "financial",
    title: "Relatórios financeiros",
    description: "Balanços patrimoniais, balancetes e notas explicativas.",
    variant: "green",
    icon: FiDollarSign,
    columns: [
      { key: "year", label: "Ano" },
      { key: "type", label: "Tipo" },
      { key: "description", label: "Descrição" },
      { key: "explanatoryNoteUrl", label: "Nota Explicativa", isFile: true },
    ],
    documents: [
      {
        id: "1",
        year: "2024",
        type: "Balanço Patrimonial",
        description: "Balancete",
        fileUrl: "",
        explanatoryNoteUrl:
          "",
        disabled: true,
      },
      {
        id: "2",
        year: "2023",
        type: "Balanço Patrimonial",
        description: "Balancete",
        fileUrl: "",
        explanatoryNoteUrl:
          "",
        disabled: true,
      },
      {
        id: "3",
        year: "2022",
        type: "Balanço Patrimonial",
        description: "Balancete",
        fileUrl: "",
        explanatoryNoteUrl:
          "",
        disabled: true,
      },
      {
        id: "4",
        year: "2021",
        type: "Balanço Patrimonial",
        description: "Balancete",
        fileUrl: "",
        explanatoryNoteUrl:
          "",
        disabled: true,
      },
      {
        id: "5",
        year: "2020",
        type: "Balanço Patrimonial",
        description: "Balancete",
        fileUrl: "/transparencia/relatorios-financeiros/relatorio-2020.pdf",
        explanatoryNoteUrl:
          "/transparencia/relatorios-financeiros/nota-2020.pdf",
      },
    ],
  },
  {
    id: "contracts",
    title: "Contratos e Serviços",
    description: "Termos, acordos, contratos e serviços executados.",
    variant: "cyan",
    icon: FiBriefcase,
    columns: [
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo de acordo" },
      { key: "startDate", label: "Início da execução" },
      { key: "endDate", label: "Término da execução" },
      { key: "expenseType", label: "Tipo de despesa" },
      { key: "value", label: "Valor" },
    ],
    documents: [
      {
        id: "1",
        name: "Projeto Ginga e Música (Nº 09/2018)",
        type: "Termo de Fomento",
        startDate: "30/11/2018",
        endDate: "30/06/2020",
        expenseType: "Custeio e Investimento",
        value: "R$ 60.000,00",
      },
    ],
  },
  {
    id: "administrative",
    title: "Estrutura Administrativa e Contatos",
    description: "Informações sobre equipe, diretoria e contatos administrativos.",
    variant: "pink",
    icon: FiUsers,
    columns: [
      { key: "year", label: "Ano" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
    ],
    documents: [
      {
        id: "1",
        year: "2025",
        name: "Diretoria Atual",
        type: "Estrutura Administrativa",
      },
    ],
  },
  {
    id: "others",
    title: "Outros / Itens Adicionais",
    description: "Outros documentos e informações adicionais de transparência.",
    variant: "red",
    icon: FiFolder,
    columns: [
      { key: "year", label: "Ano" },
      { key: "name", label: "Nome" },
      { key: "type", label: "Tipo" },
    ],
    documents: [
      {
        id: "1",
        year: "2025",
        name: "Documento adicional",
        type: "Informação complementar",
      },
    ],
  },
];