"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";


import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ThemeToggle } from "@/components/ThemeToggle";

import { useTheme } from "@/context/ThemeContext";
import { useResetPassword } from "@/hooks/useAuth/useResetPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "./schema";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { isDark, isMounted } = useTheme();
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPasswordFormData>({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function handleResetPassword(data: ResetPasswordFormData) {
    if (!token) {
      toast.error("Token de recuperação não encontrado.");
      return;
    }

    try {
      await resetPassword({
        token,
        newPassword: data.password,
      });

      toast.success("Senha redefinida com sucesso.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Token inválido ou expirado.");
    }
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
        href="/login"
        aria-label="Voltar para login"
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
          Redefinir senha
        </h1>

        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className="flex w-full flex-col items-center"
        >
          <div className="w-full max-w-85 space-y-3">
            <Input
              control={control}
              name="password"
              placeholder="Nova senha"
              variant="login"
              size="md"
              isPassword
              className="h-12 px-5 text-base"
            />

            <Input
              control={control}
              name="confirmPassword"
              placeholder="Confirmar nova senha"
              variant="login"
              size="md"
              isPassword
              className="h-12 px-5 text-base"
            />
          </div>

          <Button
            type="submit"
            variant="cyan"
            size="md"
            disabled={!isValid || isPending}
            isLoading={isPending}
            className="mt-5 min-w-37.5 bg-linear-to-r from-(--primary-cyan) to-(--primary-blue) px-8 py-3 text-sm"
          >
            SALVAR SENHA
          </Button>
        </form>
      </section>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}