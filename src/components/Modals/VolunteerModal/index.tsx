"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FiFileText, FiPhone, FiX } from "react-icons/fi";
import { IoPlay } from "react-icons/io5";
import { MdEmail } from "react-icons/md";


import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { maskPhone } from "@/utils/maskPhone";
import { yupResolver } from "@hookform/resolvers/yup";

import { volunteerSchema, type VolunteerFormData } from "./shema";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VolunteerModal({ isOpen, onClose }: VolunteerModalProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<VolunteerFormData>({
    resolver: yupResolver(volunteerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      horario: "",
    },
  });

  async function handleVolunteerSubmit(data: VolunteerFormData) {
    console.log("Dados do voluntário:", data);

    reset();
    onClose();
  }

  function handleCloseModal() {
    reset();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="volunteer-modal-title"
    >
      <div className="relative w-full max-w-180 overflow-visible rounded-4xl border border-(--border-light) bg-(--bg-card) px-5 py-6 shadow-2xl sm:px-8 sm:py-8 md:px-10">
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Fechar modal"
          className="absolute -right-8 -top-8 z-20 flex h-16 w-16 items-center justify-center rounded-2xl bg-(--primary-cyan) text-white shadow-lg transition hover:scale-105 sm:-right-10 sm:-top-10 sm:h-18 sm:w-18"
        >
          <FiX size={38} strokeWidth={4} />
        </button>

        <form
          onSubmit={handleSubmit(handleVolunteerSubmit)}
          className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_240px]"
        >
          <div className="space-y-3">
            <div className="mb-2">
              <h2
                id="volunteer-modal-title"
                className="text-base font-black leading-none text-(--primary-blue) dark:text-(--primary-cyan)"
              >
                Seja Voluntário(a)
              </h2>

              <p className="mt-2 max-w-102.5 text-sm font-black leading-tight text-(--primary-blue) dark:text-(--text-title)">
                Dê o primeiro passo para transformar vidas com a gente. Preencha
                seus dados abaixo para continuar seu cadastro.
              </p>
            </div>

            <Input
              control={control}
              name="name"
              label="Nome Completo"
              placeholder="Digite seu nome"
              variant="modal"
              size="md"
              leftIcon={<FaUser size={17} />}
            />

            <Input
              control={control}
              name="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              type="email"
              variant="modal"
              size="md"
              leftIcon={<MdEmail size={20} />}
            />

            <Input
              control={control}
              name="phone"
              label="Telefone"
              placeholder="Digite seu telefone"
              type="tel"
              variant="modal"
              size="md"
              leftIcon={<FiPhone size={18} />}
              mask={maskPhone}
            />

            <Input
              control={control}
              name="horario"
              label="Horário e dia disponível"
              placeholder="Ex: Segundas e quartas à tarde"
              variant="modal"
              size="md"
              leftIcon={<FiFileText size={18} />}
            />
          </div>

          <div className="relative flex flex-col items-center justify-end">
            <div className="relative h-52.5 w-47.5 sm:h-60 sm:w-55 md:h-65 md:w-60">
              <Image
                src="/menino-modal.PNG"
                alt="Criança sorrindo"
                fill
                priority
                sizes="(max-width: 640px) 190px, (max-width: 768px) 220px, 240px"
                className="object-contain"
              />
            </div>

            <Button
              type="submit"
              variant="cyan"
              size="md"
              disabled={!isValid || isSubmitting}
              isLoading={isSubmitting}
              className="-mt-7 min-w-42.5"
              rightIcon={
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-(--primary-cyan)">
                  <IoPlay size={22} />
                </span>
              }
            >
              ENVIAR
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
