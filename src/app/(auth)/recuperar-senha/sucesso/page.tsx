"use client";

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { MdMarkEmailRead } from "react-icons/md";

import { ThemeToggle } from "@/components/ThemeToggle";

import { useTheme } from "@/context/ThemeContext";

export default function ForgotPasswordSuccessPage() {
  const { isDark, isMounted } = useTheme();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg-main) px-5 py-10">
      {/* Onda amarela superior */}
      <svg
        className="absolute left-0 top-0 z-0 h-30 w-full"
        viewBox="0 0 1440 180"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H1440V0C1130 35 950 65 700 55C440 45 270 10 0 0Z"
          fill="var(--primary-yellow)"
        />
      </svg>

      {/* Ondas inferiores */}
      <svg
        className="absolute bottom-0 left-0 z-0 h-52.5 w-full"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 60C190 190 420 220 700 185C940 155 1120 95 1440 105V260H0V60Z"
          fill="var(--primary-orange)"
        />

        <path
          d="M0 205C210 245 420 245 660 205C925 160 1130 120 1440 130V260H0V205Z"
          fill="var(--primary-blue)"
        />

        <path
          d="M650 260C840 170 1035 115 1440 130V260H650Z"
          fill="var(--primary-green)"
        />
      </svg>

      <Link
        href="/recuperar-senha"
        aria-label="Voltar"
        className="absolute left-8 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-(--primary-cyan) to-(--primary-blue) text-white shadow-lg transition hover:scale-105"
      >
        <FiArrowLeft size={28} />
      </Link>

      <div className="absolute right-8 top-8 z-20">
        <ThemeToggle />
      </div>

      <section className="relative z-10 flex w-full max-w-105 flex-col items-center text-center">
        <Image
          src={isMounted && isDark ? "/logo-dark.png" : "/logo.png"}
          alt="Projeto Esperança"
          width={110}
          height={110}
          priority
          className="mb-6 h-auto w-27.5"
        />

        <div className="mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-(--bg-section) shadow-md dark:bg-(--bg-card)">
          <MdMarkEmailRead
            size={72}
            className="text-(--primary-yellow)"
          />
        </div>

        <h1 className="mb-4 text-center text-3xl font-black text-(--text-title)">
          E-mail enviado!
        </h1>

        <p className="mb-8 max-w-[320px] text-center text-sm font-medium leading-relaxed text-(--text-body)">
          Enviamos um link de redefinição de senha para o e-mail informado.
          Verifique sua caixa de entrada.
        </p>

        <Link
          href="/login"
          className="inline-flex min-w-57.5 items-center justify-center rounded-full bg-linear-to-r from-(--primary-cyan) to-(--primary-blue) px-8 py-3 text-sm font-black text-white shadow-md transition hover:scale-105"
        >
          VOLTAR PARA LOGIN
        </Link>
      </section>
    </main>
  );
}