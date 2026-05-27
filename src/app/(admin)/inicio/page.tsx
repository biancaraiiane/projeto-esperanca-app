"use client";

import Link from "next/link";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import { RiHandbagLine } from "react-icons/ri";

import { AdminLayout } from "@/components/Admin/AdminLayout";

import { useGetAdminMe } from "@/hooks/useAdmin/useAdmin";
import { useGetPartnerships } from "@/hooks/usePartnerships/usePartnerships";
import { useGetVolunteers } from "@/hooks/useVolunteers/useVolunteers";
import type { ApiStatus } from "@/types/api";

function getStatusLabel(status: ApiStatus) {
  const labels: Record<ApiStatus, string> = {
    PENDENTE: "Pendente",
    ACEITA: "Aceita",
    NEGADA: "Negada",
  };

  return labels[status];
}

function getStatusClass(status: ApiStatus) {
  const classes: Record<ApiStatus, string> = {
    PENDENTE:
      "bg-[#FFF4BE] text-[#D88A00] dark:border dark:border-[#A97709] dark:bg-[#2A2108] dark:text-[#F5B23C]",
    ACEITA:
      "bg-[#DFF7E5] text-[#21801A] dark:border dark:border-[#1F7A3A] dark:bg-[#102A18] dark:text-[#42D77D]",
    NEGADA:
      "bg-[#FFE0E0] text-[#F44336] dark:border dark:border-[#743333] dark:bg-[#341818] dark:text-[#FF7777]",
  };

  return classes[status];
}

function formatDate(date: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export default function InicioPage() {
  const { data: admin } = useGetAdminMe();

  const {
    data: volunteers = [],
    isLoading: isLoadingVolunteers,
    isError: isVolunteersError,
  } = useGetVolunteers();

  const {
    data: partnerships = [],
    isLoading: isLoadingPartnerships,
    isError: isPartnershipsError,
  } = useGetPartnerships();

  const isLoading = isLoadingVolunteers || isLoadingPartnerships;
  const hasError = isVolunteersError || isPartnershipsError;

  const pendingVolunteers = volunteers.filter(
    (volunteer) => volunteer.status === "PENDENTE",
  ).length;

  const approvedVolunteers = volunteers.filter(
    (volunteer) => volunteer.status === "ACEITA",
  ).length;

  const pendingPartners = partnerships.filter(
    (partner) => partner.status === "PENDENTE",
  ).length;

  const approvedPartners = partnerships.filter(
    (partner) => partner.status === "ACEITA",
  ).length;

  const latestVolunteers = volunteers.slice(0, 4);
  const latestPartners = partnerships.slice(0, 4);

  return (
    <AdminLayout>
      <div className="mb-7">
        <h1 className="text-3xl font-black text-(--text-title)">Início</h1>

        <p className="mt-2 text-sm font-medium text-(--text-muted)">
          Olá, {admin?.name ?? "Admin"}. Veja um resumo das solicitações
          recebidas pelo Projeto Esperança.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 text-sm font-semibold text-(--text-muted)">
          Carregando informações do painel...
        </div>
      )}

      {hasError && (
        <div className="rounded-2xl border border-[#F44336]/30 bg-[#FFE0E0] p-6 text-sm font-semibold text-[#F44336] dark:bg-[#341818] dark:text-[#FF7777]">
          Não foi possível carregar os dados do painel.
        </div>
      )}

      {!isLoading && !hasError && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-5 shadow-sm">
              <FiUsers className="mb-4 text-(--primary-blue)" size={32} />

              <p className="text-sm font-bold text-(--text-muted)">
                Voluntários
              </p>

              <h2 className="mt-2 text-3xl font-black text-(--text-title)">
                {volunteers.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-5 shadow-sm">
              <FiClock className="mb-4 text-[#D88A00]" size={32} />

              <p className="text-sm font-bold text-(--text-muted)">
                Voluntários pendentes
              </p>

              <h2 className="mt-2 text-3xl font-black text-(--text-title)">
                {pendingVolunteers}
              </h2>
            </div>

            <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-5 shadow-sm">
              <RiHandbagLine className="mb-4 text-[#21801A]" size={32} />

              <p className="text-sm font-bold text-(--text-muted)">
                Parcerias
              </p>

              <h2 className="mt-2 text-3xl font-black text-(--text-title)">
                {partnerships.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-5 shadow-sm">
              <FiAlertCircle className="mb-4 text-[#F44336]" size={32} />

              <p className="text-sm font-bold text-(--text-muted)">
                Parcerias pendentes
              </p>

              <h2 className="mt-2 text-3xl font-black text-(--text-title)">
                {pendingPartners}
              </h2>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-(--text-title)">
                    Últimos voluntários
                  </h2>

                  <p className="mt-1 text-sm font-medium text-(--text-muted)">
                    Inscrições mais recentes.
                  </p>
                </div>

                <Link
                  href="/voluntarios"
                  className="flex items-center gap-1 text-sm font-black text-(--primary-pink) transition hover:scale-105"
                >
                  Ver todos
                  <FiArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-3">
                {latestVolunteers.map((volunteer) => (
                  <div
                    key={volunteer.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-(--border-light) bg-(--bg-main) px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-black text-(--text-title)">
                        {volunteer.name}
                      </p>

                      <p className="mt-1 text-xs font-medium text-(--text-muted)">
                        {volunteer.email}
                      </p>

                      <p className="mt-1 text-xs font-medium text-(--text-muted)">
                        {formatDate(volunteer.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-md px-3 py-1 text-xs font-black ${getStatusClass(
                        volunteer.status,
                      )}`}
                    >
                      {getStatusLabel(volunteer.status)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-(--text-title)">
                    Últimas parcerias
                  </h2>

                  <p className="mt-1 text-sm font-medium text-(--text-muted)">
                    Solicitações mais recentes.
                  </p>
                </div>

                <Link
                  href="/parceiros-admin"
                  className="flex items-center gap-1 text-sm font-black text-(--primary-pink) transition hover:scale-105"
                >
                  Ver todas
                  <FiArrowRight size={16} />
                </Link>
              </div>

              <div className="space-y-3">
                {latestPartners.map((partner) => (
                  <div
                    key={partner.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-(--border-light) bg-(--bg-main) px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-black text-(--text-title)">
                        {partner.companyName}
                      </p>

                      <p className="mt-1 line-clamp-1 text-xs font-medium text-(--text-muted)">
                        {partner.partnershipType}
                      </p>

                      <p className="mt-1 text-xs font-medium text-(--text-muted)">
                        {formatDate(partner.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-md px-3 py-1 text-xs font-black ${getStatusClass(
                        partner.status,
                      )}`}
                    >
                      {getStatusLabel(partner.status)}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="rounded-2xl border border-(--border-light) bg-(--bg-card) p-6 shadow-sm xl:col-span-2">
              <h2 className="text-xl font-black text-(--text-title)">
                Resumo do painel
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-(--bg-main) p-4">
                  <FiCheckCircle className="mb-3 text-[#21801A]" size={24} />

                  <p className="text-sm font-black text-(--text-title)">
                    {approvedVolunteers} voluntários aceitos
                  </p>
                </div>

                <div className="rounded-xl bg-(--bg-main) p-4">
                  <FiCheckCircle className="mb-3 text-[#21801A]" size={24} />

                  <p className="text-sm font-black text-(--text-title)">
                    {approvedPartners} parcerias aceitas
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-(--border-light) bg-linear-to-br from-(--primary-cyan) to-(--primary-blue) p-6 text-white shadow-sm">
              <h2 className="text-xl font-black">Ações rápidas</h2>

              <div className="mt-5 space-y-3">
                <Link
                  href="/voluntarios"
                  className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-black transition hover:scale-[1.02] hover:bg-white/20"
                >
                  Gerenciar voluntários
                  <FiArrowRight size={18} />
                </Link>

                <Link
                  href="/parceiros-admin"
                  className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-black transition hover:scale-[1.02] hover:bg-white/20"
                >
                  Gerenciar parcerias
                  <FiArrowRight size={18} />
                </Link>

                <Link
                  href="/perfil"
                  className="flex items-center justify-between rounded-xl bg-white/15 px-4 py-3 text-sm font-black transition hover:scale-[1.02] hover:bg-white/20"
                >
                  Meu perfil
                  <FiArrowRight size={18} />
                </Link>
              </div>
            </section>
          </div>
        </>
      )}
    </AdminLayout>
  );
}