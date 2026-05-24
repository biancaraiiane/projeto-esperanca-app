"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/Button";
import { DonationModal } from "@/components/Modals/DonationModal";

export function QuemSomos() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  return (
    <section
      id="quem-somos"
      className="w-full bg-(--bg-main) px-5 py-16 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Coluna esquerda: texto */}
          <div className="flex-1">
            <h2 className="mb-8 text-5xl font-black uppercase leading-none xl:text-6xl">
              <span className="text-(--primary-cyan)">QUEM </span>
              <span className="text-(--primary-cyan)">SOMOS</span>
            </h2>

            <p className="text-justify text-base leading-relaxed lg:text-lg">
              <span className="text-(--primary-cyan)">
                O Projeto Esperança nasceu com o propósito de levar
                cuidado,{" "}
              </span>
              <span className="font-bold text-(--text-title)">apoio e</span>
              <span className="text-(--primary-cyan)">
                {" "}
                dignidade a quem mais precisa.{" "}
              </span>
              <span className="font-bold text-(--text-title)">
                Por meio de ações sociais, atendimento humanizado e iniciativas
                de solidariedade, buscamos fortalecer famílias, acolher{" "}
              </span>
              <span className="text-(--primary-cyan)">histórias e </span>
              <span className="font-bold text-(--text-title)">
                construir novos caminhos de esperança.
              </span>
            </p>
          </div>

          {/* Coluna direita: card com imagem */}
          <div className="w-full max-w-xs shrink-0 sm:max-w-sm lg:max-w-md">
            <div className="relative rounded-[28px] bg-linear-to-br from-[#35cfe0] to-[#0057d9] px-5 pb-16 pt-5 shadow-2xl sm:rounded-[34px]">
              {/* Imagem com borda amarela */}
              <div className="overflow-hidden rounded-[42px] border-18 border-(--primary-yellow) sm:rounded-[56px] sm:border-24">
                <div className="relative h-56 w-full sm:h-60 lg:h-72">
                  <Image
                    src="/quem-somos.png"
                    alt="Crianças do Projeto Esperança"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Botão DOE AGORA */}
              <Button
                variant="pink"
                size="lg"
                onClick={() => setIsDonationModalOpen(true)}
                className="absolute -bottom-7 left-1/2 min-w-52.5 -translate-x-1/2 px-8 py-4 text-xl shadow-xl"
              >
                DOE AGORA
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </section>
  );
}
