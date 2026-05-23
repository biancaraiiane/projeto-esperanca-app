"use client";

import Image from "next/image";
import { FiCopy, FiX } from "react-icons/fi";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const pixEmail = "projetoesperancaaju@hotmail.com";
const cnpj = "08.278.469/0001-07";

export function DonationModal({ isOpen, onClose }: DonationModalProps) {
  async function handleCopyPixEmail() {
    await navigator.clipboard.writeText(pixEmail);
  }

  async function handleCopyCnpj() {
    await navigator.clipboard.writeText(cnpj);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donation-modal-title"
    >
      <div className="relative w-full max-w-180 overflow-visible rounded-4xl border border-(--border-light) bg-(--bg-card) px-6 py-8 shadow-2xl sm:px-8 md:px-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute -right-7 -top-7 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-(--primary-cyan) text-white shadow-lg transition hover:scale-105 sm:-right-9 sm:-top-9 sm:h-18 sm:w-18"
        >
          <FiX size={38} strokeWidth={4} />
        </button>

        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_190px_1fr] md:gap-6">
          <div>
            <h2
              id="donation-modal-title"
              className="text-[34px] font-black uppercase leading-none text-(--primary-cyan)"
            >
              Doação
            </h2>

            <p className="mt-8 max-w-55 text-center text-sm font-black leading-tight text-(--primary-orange) dark:text-(--primary-yellow) md:text-right">
              Sua contribuição faz a diferença. Ajude o Projeto Esperança a
              continuar levando cuidado, acolhimento e solidariedade para quem
              mais precisa.
            </p>
          </div>

          <div className="mx-auto flex h-42.5 w-42.5 items-center justify-center rounded-[28px] border-12 border-(--primary-green) bg-white p-2 shadow-md sm:h-47.5 sm:w-47.5">
            <Image
              src="/qrcode-esperanca.jpeg"
              alt="QR Code para doação ao Projeto Esperança"
              width={170}
              height={170}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div className="space-y-4 text-sm font-black text-(--primary-orange) dark:text-(--primary-yellow)">
            <div>
              <p>Pix Copia e Cola</p>

              <button
                type="button"
                onClick={handleCopyPixEmail}
                className="mt-1 inline-flex items-center gap-2 break-all text-left text-[13px] leading-tight transition hover:text-(--primary-blue) dark:hover:text-(--primary-cyan)"
              >
                {pixEmail}
                <FiCopy size={15} />
              </button>
            </div>

            <div>
              <p>CNPJ</p>

              <button
                type="button"
                onClick={handleCopyCnpj}
                className="mt-1 inline-flex items-center gap-2 text-left text-[13px] transition hover:text-(--primary-blue) dark:hover:text-(--primary-cyan)"
              >
                {cnpj}
                <FiCopy size={15} />
              </button>
            </div>

            <div>
              <p>Beneficiário:</p>
              <p className="text-[13px] leading-tight">
                Projeto Esperança
              </p>
            </div>

            <div>
              <p>Chave:</p>
              <p className="break-all text-[13px] leading-tight">
                {pixEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}