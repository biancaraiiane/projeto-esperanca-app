"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ThemeToggle } from "@/components/ThemeToggle";

import { useAuthContext } from "@/context";
import { useTheme } from "@/context/ThemeContext";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema, type LoginFormData } from "./schema";

export default function LoginPage() {
  const { handleSignIn, isPending } = useAuthContext();
  const { isDark, isMounted } = useTheme();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleLogin(data: LoginFormData) {
    handleSignIn({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-(--bg-main) px-5 py-10">
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

      <div className="absolute right-8 top-8 z-20">
        <ThemeToggle />
      </div>

      <Link
        href="/"
        aria-label="Voltar para página inicial"
        className="absolute left-8 top-24 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-(--primary-cyan) to-(--primary-blue) text-white shadow-lg transition hover:scale-105"
      >
        <FiArrowLeft size={28} />
      </Link>

      <section className="relative z-10 flex w-full max-w-85 flex-col items-center">
        <Image
          src={isMounted && isDark ? "/logo-dark.png" : "/logo.png"}
          alt="Projeto Esperança"
          width={110}
          height={110}
          priority
          className="mb-5 h-auto w-27.5"
        />

        <h1 className="mb-4 text-center text-3xl font-normal text-(--text-title)">
          Entrar
        </h1>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex w-full flex-col items-center"
        >
          <div className="w-full max-w-85 space-y-3">
            <Input
              control={control}
              name="email"
              placeholder="Email"
              type="email"
              variant="login"
              size="md"
              className="h-12 px-5 text-base"
            />

            <Input
              control={control}
              name="password"
              placeholder="Senha"
              variant="login"
              size="md"
              isPassword
              className="h-12 px-5 text-base"
            />
          </div>

          <Link
            href="/recuperar-senha"
            className="mt-2 block w-full max-w-85 text-right text-sm text-(--text-muted) underline transition hover:text-(--primary-blue)"
          >
            Esqueci a senha
          </Link>

          <Button
            type="submit"
            variant="cyan"
            size="md"
            disabled={!isValid || isPending}
            isLoading={isPending}
            className="mt-4 min-w-37.5 bg-linear-to-r from-(--primary-cyan) to-(--primary-blue) px-8 py-3 text-sm"
          >
            LOGIN
          </Button>
        </form>
      </section>
    </main>
  );
}