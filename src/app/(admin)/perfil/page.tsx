"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FiLock, FiPlus, FiSave, FiUser } from "react-icons/fi";


import { AdminLayout } from "@/components/Admin/AdminLayout";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import {
  useGetAdminMe,
  useRegisterAdmin,
  useUpdateAdminMe,
} from "@/hooks/useAdmin/useAdmin";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import {
  newAdminSchema,
  passwordSchema,
  profileSchema,
  type NewAdminFormData,
  type PasswordFormData,
  type ProfileFormData,
} from "./schema";

function formatDateToInput(date?: string) {
  if (!date) return "";

  return date.split("T")[0];
}

function getInitials(name?: string) {
  if (!name) return "AD";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

export default function PerfilPage() {
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [adminSuccess, setAdminSuccess] = useState("");

  const {
    data: admin,
    isLoading: isLoadingAdmin,
    isError: isAdminError,
  } = useGetAdminMe();

  const {
    mutateAsync: updateAdminMe,
    isPending: isUpdatingAdmin,
  } = useUpdateAdminMe();

  const {
    mutateAsync: registerAdmin,
    isPending: isRegisteringAdmin,
  } = useRegisterAdmin();

  const profileInitials = useMemo(() => {
    return getInitials(admin?.name);
  }, [admin?.name]);

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    formState: { isValid: isProfileValid },
  } = useForm<ProfileFormData>({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      birthDate: "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { isValid: isPasswordValid },
  } = useForm<PasswordFormData>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    control: newAdminControl,
    handleSubmit: handleNewAdminSubmit,
    reset: resetNewAdminForm,
    formState: { isValid: isNewAdminValid },
  } = useForm<NewAdminFormData>({
    resolver: yupResolver(newAdminSchema),
    mode: "onChange",
    defaultValues: {
      adminName: "",
      adminEmail: "",
      adminPassword: "",
      adminBirthDate: "",
    },
  });

  useEffect(() => {
    if (!admin) return;

    resetProfileForm({
      name: admin.name ?? "",
      birthDate: formatDateToInput(admin.birthDate),
    });
  }, [admin, resetProfileForm]);

  async function onSubmitProfile(data: ProfileFormData) {
    setProfileSuccess("");

    try {
      await updateAdminMe({
        name: data.name,
        birthDate: data.birthDate,
      });

      setProfileSuccess("Informações atualizadas com sucesso!");
      toast.success("Perfil atualizado com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o perfil.");
    }
  }

  async function onSubmitPassword(data: PasswordFormData) {
    setPasswordSuccess("");

    if (!admin) {
      toast.error("Não foi possível identificar o administrador.");
      return;
    }

    try {
      await updateAdminMe({
        name: admin.name,
        birthDate: formatDateToInput(admin.birthDate),
        password: data.newPassword,
      });

      resetPasswordForm();
      setPasswordSuccess("Senha alterada com sucesso!");
      toast.success("Senha alterada com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível alterar a senha.");
    }
  }

  async function onSubmitNewAdmin(data: NewAdminFormData) {
    setAdminSuccess("");

    try {
      await registerAdmin({
        name: data.adminName,
        email: data.adminEmail,
        password: data.adminPassword,
        birthDate: data.adminBirthDate,
      });

      resetNewAdminForm();
      setAdminSuccess("Novo administrador cadastrado com sucesso!");
      toast.success("Novo administrador cadastrado com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível cadastrar o novo administrador.");
    }
  }

  return (
    <AdminLayout>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-(--text-title)">Meu Perfil</h1>

        <p className="mt-2 text-sm font-medium text-(--text-muted)">
          Gerencie suas informações, altere sua senha e cadastre novos
          administradores.
        </p>
      </div>

      {isLoadingAdmin && (
        <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 text-sm font-semibold text-(--text-muted)">
          Carregando informações do perfil...
        </div>
      )}

      {isAdminError && (
        <div className="rounded-2xl border border-[#F44336]/30 bg-[#FFE0E0] p-6 text-sm font-semibold text-[#F44336] dark:bg-[#341818] dark:text-[#FF7777]">
          Não foi possível carregar as informações do administrador.
        </div>
      )}

      {!isLoadingAdmin && !isAdminError && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-(--primary-cyan) to-(--primary-blue) text-4xl font-black text-white shadow-lg">
                <span>{profileInitials}</span>
              </div>

              <h2 className="text-xl font-black text-(--text-title)">
                {admin?.name ?? "Admin Projeto Esperança"}
              </h2>

              <p className="mt-1 text-sm font-medium text-(--text-muted)">
                {admin?.email}
              </p>

              <p className="mt-1 text-sm font-medium text-(--text-muted)">
                Administrador
              </p>
            </div>

            <form
              onSubmit={handleProfileSubmit(onSubmitProfile)}
              className="mt-8 space-y-4"
            >
              <Input
                control={profileControl}
                name="name"
                label="Nome"
                variant="outline"
                size="md"
                leftIcon={<FiUser size={18} />}
              />

              <Input
                control={profileControl}
                name="birthDate"
                label="Data de nascimento"
                type="date"
                variant="outline"
                size="md"
              />

              <Button
                type="submit"
                variant="pink"
                size="md"
                disabled={!isProfileValid || isUpdatingAdmin}
                isLoading={isUpdatingAdmin}
                leftIcon={<FiSave size={18} />}
                className="mt-2 cursor-pointer"
                fullWidth
              >
                SALVAR ALTERAÇÕES
              </Button>

              {profileSuccess && (
                <p className="text-center text-sm font-semibold text-(--primary-green)">
                  {profileSuccess}
                </p>
              )}
            </form>
          </section>

          <div className="grid grid-cols-1 gap-6">
            <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF4BE] text-[#D88A00] dark:bg-[#2A2108] dark:text-[#F5B23C]">
                  <FiLock size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-(--text-title)">
                    Alterar senha
                  </h2>

                  <p className="text-sm font-medium text-(--text-muted)">
                    Atualize sua senha de acesso ao painel.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handlePasswordSubmit(onSubmitPassword)}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <Input
                  control={passwordControl}
                  name="newPassword"
                  label="Nova senha"
                  variant="outline"
                  size="md"
                  isPassword
                />

                <Input
                  control={passwordControl}
                  name="confirmPassword"
                  label="Confirmar senha"
                  variant="outline"
                  size="md"
                  isPassword
                />

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    variant="cyan"
                    size="md"
                    disabled={!isPasswordValid || isUpdatingAdmin}
                    isLoading={isUpdatingAdmin}
                    className="cursor-pointer"
                  >
                    ALTERAR SENHA
                  </Button>
                </div>

                {passwordSuccess && (
                  <p className="text-sm font-semibold text-(--primary-green) md:col-span-2">
                    {passwordSuccess}
                  </p>
                )}
              </form>
            </section>

            <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DFF7E5] text-[#21801A] dark:bg-[#102A18] dark:text-[#42D77D]">
                  <FiPlus size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-black text-(--text-title)">
                    Cadastrar novo admin
                  </h2>

                  <p className="text-sm font-medium text-(--text-muted)">
                    Adicione outro administrador ao painel.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleNewAdminSubmit(onSubmitNewAdmin)}
                className="grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <Input
                  control={newAdminControl}
                  name="adminName"
                  label="Nome"
                  variant="outline"
                  size="md"
                />

                <Input
                  control={newAdminControl}
                  name="adminEmail"
                  label="E-mail"
                  type="email"
                  variant="outline"
                  size="md"
                />

                <Input
                  control={newAdminControl}
                  name="adminPassword"
                  label="Senha"
                  variant="outline"
                  size="md"
                  isPassword
                />

                <Input
                  control={newAdminControl}
                  name="adminBirthDate"
                  label="Data de nascimento"
                  type="date"
                  variant="outline"
                  size="md"
                />

                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    variant="volunteer"
                    size="md"
                    disabled={!isNewAdminValid || isRegisteringAdmin}
                    isLoading={isRegisteringAdmin}
                    className="cursor-pointer"
                  >
                    CADASTRAR ADMIN
                  </Button>
                </div>

                {adminSuccess && (
                  <p className="text-sm font-semibold text-(--primary-green) md:col-span-2">
                    {adminSuccess}
                  </p>
                )}
              </form>
            </section>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}