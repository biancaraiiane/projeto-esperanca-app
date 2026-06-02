"use client";

import { useState } from "react";
import { FiFileText } from "react-icons/fi";

import { TransparencyModal } from "@/components/TransparencyModal";

import {
  transparencyCategories,
  type TransparencyCategory,
} from "@/data/transparencyData";

const fileVariantClasses: Record<TransparencyCategory["variant"], string> = {
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
  const [selectedFile, setSelectedFile] = useState<TransparencyCategory | null>(
    null,
  );

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
          transparente, conforme as exigências do{" "}
          <a
            href="https://www.mpse.mp.br/index.php/2020/08/06/projeto-ong-transparente-do-mpse-e-selecionado-para-a-17a-edicao-do-premio-innovare/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-(--primary-blue) underline hover:text-(--primary-cyan) dark:text-(--primary-cyan) dark:hover:text-(--primary-blue)"
          >
            Projeto ONG Transparente do Ministério Público de Sergipe.
          </a>
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {transparencyCategories.map((file) => (
            <button
              key={file.id}
              type="button"
              onClick={() => setSelectedFile(file)}
              className={`flex min-h-19.5 cursor-pointer items-center gap-4 rounded-lg border border-transparent px-5 py-4 text-left shadow-lg transition hover:-translate-y-1 hover:scale-[1.02] ${fileVariantClasses[file.variant]}`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-3 border-current">
                <FiFileText size={24} />
              </span>

              <span className="text-sm font-black leading-tight">
                {file.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <TransparencyModal
        isOpen={!!selectedFile}
        data={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </section>
  );
}