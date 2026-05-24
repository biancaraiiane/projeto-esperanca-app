import { FiFileText } from "react-icons/fi";

interface TransparencyFile {
  id: string;
  title: string;
  href: string;
  variant: "yellow" | "purple" | "green" | "cyan" | "pink" | "red";
}

const transparencyFiles: TransparencyFile[] = [
  {
    id: "1",
    title: "Informações Institucionais",
    href: "/transparencia/informacoes-institucionais.pdf",
    variant: "yellow",
  },
  {
    id: "2",
    title: "Impacto Social",
    href: "/transparencia/impacto-social.pdf",
    variant: "purple",
  },
  {
    id: "3",
    title: "Relatórios financeiros",
    href: "/transparencia/relatorios-financeiros.pdf",
    variant: "green",
  },
  {
    id: "4",
    title: "Contatos e Serviços",
    href: "/transparencia/contatos-e-servicos.pdf",
    variant: "cyan",
  },
  {
    id: "5",
    title: "Estrutura Administrativa e Contatos",
    href: "/transparencia/estrutura-administrativa.pdf",
    variant: "pink",
  },
  {
    id: "6",
    title: "Outros / Itens Adicionais",
    href: "/transparencia/outros-itens-adicionais.pdf",
    variant: "red",
  },
];

const fileVariantClasses: Record<TransparencyFile["variant"], string> = {
  yellow:
    "bg-[#FFF4BE] text-[#111111] dark:bg-[#2A2514] dark:text-[#F5D96B] dark:border-[#5A4B18]",
  purple:
    "bg-[#CDA1F2] text-[#111111] dark:bg-[#241730] dark:text-[#D7A8FF] dark:border-[#593170]",
  green:
    "bg-[#C9FA7B] text-[#111111] dark:bg-[#1E2D14] dark:text-[#B8F56A] dark:border-[#3D641D]",
  cyan:
    "bg-[#91D7F5] text-[#111111] dark:bg-[#102936] dark:text-[#7DDCFF] dark:border-[#24506A]",
  pink:
    "bg-[#FF7FC3] text-[#111111] dark:bg-[#341528] dark:text-[#FF8DCC] dark:border-[#74335B]",
  red:
    "bg-[#FF8D8D] text-[#111111] dark:bg-[#361818] dark:text-[#FF9999] dark:border-[#743333]",
};

export function TransparencySection() {
  return (
    <section
      id="transparencia"
      className="w-full bg-(--bg-main) px-5 py-16 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-6 text-center text-4xl font-black uppercase text-(--primary-blue) dark:text-(--primary-cyan) md:text-5xl">
          Transparência
        </h2>

        <p className="mx-auto mb-10 max-w-5xl text-justify text-sm font-medium leading-relaxed text-(--text-title) dark:text-(--text-body) md:text-base">
          No Projeto Esperança, acreditamos que a transparência é essencial para
          manter a confiança de todos que apoiam nossa missão. Aqui, mostramos
          com clareza como os recursos são aplicados e como cada ação contribui
          para transformar vidas. Cumprimos as exigências da Lei nº 12.527/2011
          (Lei de Acesso à Informação) e Lei nº 13.019/2014 (Normas Gerais para
          as Parcerias entre a Administração Pública e Organizações da Sociedade
          Civil), reafirmando nosso compromisso com uma gestão responsável e
          transparente, conforme as exigências do Projeto ONG Transparente do
          Ministério Público de Sergipe.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {transparencyFiles.map((file) => (
            <a
              key={file.id}
              href={file.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-19.5 items-center gap-4 rounded-lg border border-transparent px-5 py-4 shadow-lg transition hover:-translate-y-1 hover:scale-[1.02] ${fileVariantClasses[file.variant]}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-3 border-current">
                <FiFileText size={24} />
              </span>

              <span className="text-sm font-black leading-tight">
                {file.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}