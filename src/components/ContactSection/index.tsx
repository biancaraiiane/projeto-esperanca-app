"use client";

import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { yupResolver } from "@hookform/resolvers/yup";

import { Textarea } from "../TextArea";
import { contactSchema, type ContactFormData } from "./schema";

const projectAddress = "Rua Claudionor Leite, 100, Farolândia, Aracaju-SE";

const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  projectAddress
)}`;

const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  projectAddress
)}&output=embed`;

const instagramUrl = "https://www.instagram.com/projeto.esperanca.ofc/";

const whatsappMessage =
  "Olá! Conheci o Projeto Esperança pelo site e gostaria de saber como posso ajudar. 😊";

const whatsappUrl = `https://wa.me/5579996865277?text=${encodeURIComponent(
  whatsappMessage
)}`;

const adminLoginUrl = "/login";

function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

function maskDdd(value: string) {
  return onlyNumbers(value).slice(0, 2);
}

function maskPhone(value: string) {
  const numbers = onlyNumbers(value).slice(0, 9);

  if (numbers.length <= 8) {
    return numbers.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return numbers.replace(/(\d{5})(\d)/, "$1-$2");
}

export function ContactSection() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      ddd: "",
      phone: "",
      message: "",
      acceptedTerms: false,
      acceptedEmails: false,
    },
  });

  async function handleContactSubmit(data: ContactFormData) {
    setSuccessMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Não foi possível enviar a mensagem.");
    }

    setSuccessMessage("Mensagem enviada com sucesso!");
    reset();
  }

  return (
    <footer
      id="contatos"
      className="relative overflow-hidden bg-linear-to-br from-[#0057D9] via-(--primary-cyan) to-[#65DEE3] px-5 pb-16 pt-36 text-white dark:from-[#020B14] dark:via-[#03101C] dark:to-[#050B12] sm:px-8 lg:px-12 xl:px-20"
    >
      <svg
        className="absolute left-0 top-0 h-37.5 w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 70C230 150 430 125 650 70C900 8 1110 -8 1440 55V0H0V70Z"
          fill="var(--bg-main)"
        />

        <path
          d="M0 80C250 165 470 140 700 80C950 15 1160 0 1440 65V95C1110 35 930 45 700 105C470 165 250 185 0 110V80Z"
          fill="var(--primary-pink)"
        />

        <path
          d="M0 58C250 150 470 125 700 65C950 0 1160 -10 1440 45V72C1120 20 930 27 700 88C470 150 250 170 0 88V58Z"
          fill="var(--primary-orange)"
        />

        <path
          d="M0 68C240 145 455 120 680 66C920 10 1120 2 1440 58V82C1125 30 935 35 700 90C465 145 235 165 0 98V68Z"
          fill="var(--primary-yellow)"
        />
      </svg>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <div>
          <div className="mb-8">
            <h2 className="mb-3 text-3xl font-black text-white">Endereço</h2>

            <p className="text-lg leading-relaxed text-white/90">
              Rua Claudionor Leite, 100
              <br />
              Farolândia, Aracaju-SE.
              <br />
              CEP: 49032-340.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-3xl font-black text-white">
              Fale Conosco
            </h2>

            <p className="text-lg leading-relaxed text-white/90">
              Instituição: Projeto Esperança
              <br />
              CNPJ: 08.278.469/0001-07
              <br />
              Telefone 1: (79) 3243-2652
              <br />
              Telefone 2: (79) 99686-5277
              <br />
              E-mail: projetoesperancaaju@hotmail.com
              <br />
              Horário de Funcionamento: Segunda à Sexta 08:00
              <br />- 12:00 | 13:00 - 17:00
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram do Projeto Esperança"
              className="text-white transition hover:scale-110"
            >
              <FaInstagram size={58} />
            </Link>

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp do Projeto Esperança"
              className="text-white transition hover:scale-110"
            >
              <FaWhatsapp size={58} />
            </Link>

            <Link
              href={adminLoginUrl}
              aria-label="Acessar área restrita"
              className="flex items-center gap-2 rounded-full border border-white/40 px-4 py-2 text-white transition hover:scale-105 hover:bg-white/10"
            >
              <RiAdminLine size={34} />

              <span className="text-sm font-black uppercase leading-tight">
                Acesso
                <br />
                restrito
              </span>
            </Link>
            <p>
              © 2026 Projeto Esperança. Todos os direitos reservados. criatividade 
               <strong> Glória</strong> • Desenvolvimento <strong>Bianca Raiane</strong>
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-black text-white">
            Entre em Contato Conosco
          </h2>

          <form onSubmit={handleSubmit(handleContactSubmit)}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
              <Input
                control={control}
                name="name"
                label="Nome*"
                variant="outline"
                size="md"
                className="rounded-none border-0 border-b border-white/70 bg-transparent px-0 text-white placeholder:text-white/60 focus:border-white"
              />

              <Input
                control={control}
                name="email"
                label="E-mail*"
                type="email"
                variant="outline"
                size="md"
                className="rounded-none border-0 border-b border-white/70 bg-transparent px-0 text-white placeholder:text-white/60 focus:border-white"
              />

              <Input
                control={control}
                name="ddd"
                label="DDD*"
                variant="outline"
                size="md"
                inputMode="numeric"
                maxLength={2}
                mask={maskDdd}
                className="rounded-none border-0 border-b border-white/70 bg-transparent px-0 text-white placeholder:text-white/60 focus:border-white"
              />

              <Input
                control={control}
                name="phone"
                label="Telefone*"
                variant="outline"
                size="md"
                inputMode="numeric"
                mask={maskPhone}
                className="rounded-none border-0 border-b border-white/70 bg-transparent px-0 text-white placeholder:text-white/60 focus:border-white"
              />

              <div className="md:col-span-2">
                <Textarea
                  control={control}
                  name="message"
                  label="Mensagem*"
                  variant="outline"
                  className="rounded-none border-0 border-b border-white/70 bg-transparent px-0 text-white placeholder:text-white/60 focus:border-white"
                />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <Controller
                name="acceptedTerms"
                control={control}
                render={({ field }) => (
                  <label className="flex cursor-pointer items-start gap-3 text-base leading-snug text-white/90">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1 h-5 w-5 shrink-0 accent-(--primary-pink)"
                    />

                    <span>
                      Eu concordo com os
                      <span className="text-(--primary-yellow)">
                        Termos de Uso
                      </span>
                      e com a
                      <span className="text-(--primary-yellow)">
                        Política de Privacidade
                      </span>
                      localizados no final desta página.
                    </span>
                  </label>
                )}
              />

              {errors.acceptedTerms && (
                <p className="text-sm font-semibold text-(--red-danger)">
                  {errors.acceptedTerms.message}
                </p>
              )}

              <Controller
                name="acceptedEmails"
                control={control}
                render={({ field }) => (
                  <label className="flex cursor-pointer items-start gap-3 text-base leading-snug text-white/90">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mt-1 h-5 w-5 shrink-0 accent-(--primary-pink)"
                    />

                    <span>
                      Eu aceito receber e-mails institucionais e promocionais.
                    </span>
                  </label>
                )}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                type="submit"
                variant="volunteer"
                size="md"
                disabled={!isValid || isSubmitting}
                isLoading={isSubmitting}
                className="min-w-37.5 text-base"
              >
                ENVIAR
              </Button>
            </div>

            {successMessage && (
              <p className="mt-4 text-center text-sm font-bold text-(--primary-yellow)">
                {successMessage}
              </p>
            )}
          </form>

          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir localização do Projeto Esperança no Google Maps"
            className="mt-8 block overflow-hidden border border-white/40 bg-white/20 transition hover:scale-[1.01]"
          >
            <iframe
              title="Localização do Projeto Esperança"
              src={googleMapsEmbedUrl}
              className="pointer-events-none h-47.5 w-full grayscale dark:invert"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}
