"use client";

import { useMemo, useState } from "react";


import { ActionButtons } from "@/components/Admin/ActionButtons";
import { AdminLayout } from "@/components/Admin/AdminLayout";
import {
  AdminTable,
  type AdminTableColumn,
} from "@/components/Admin/AdminTable";
import { Pagination } from "@/components/Admin/Pagination";
import { StatusBadge } from "@/components/Admin/StatusBadge";
import { StatusTabs } from "@/components/Admin/StatusTabs";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";

import {
  useGetVolunteers,
  useUpdateVolunteerStatus,
} from "@/hooks/useVolunteers/useVolunteers";
import type { ApiStatus, VolunteerApi } from "@/types/api";
import { toast } from "sonner";

type StatusFilter = "ALL" | ApiStatus;
type ConfirmationAction = "APPROVE" | "REJECT";

const itemsPerPage = 5;

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function formatDate(date: string) {
  if (!date) return "-";

  return new Intl.DateTimeFormat("pt-BR").format(new Date(date));
}

export default function VoluntariosPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedVolunteer, setSelectedVolunteer] =
    useState<VolunteerApi | null>(null);
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction | null>(null);

  const {
    data: volunteers = [],
    isLoading,
    isError,
  } = useGetVolunteers({
    name: search,
    status: selectedStatus === "ALL" ? "" : selectedStatus,
  });

  const { mutateAsync: updateVolunteerStatus, isPending: isUpdatingStatus } =
    useUpdateVolunteerStatus();

  const counts = useMemo(() => {
    return {
      all: volunteers.length,
      pending: volunteers.filter((volunteer) => volunteer.status === "PENDENTE")
        .length,
      approved: volunteers.filter((volunteer) => volunteer.status === "ACEITA")
        .length,
      rejected: volunteers.filter((volunteer) => volunteer.status === "NEGADA")
        .length,
    };
  }, [volunteers]);

  const totalPages = Math.ceil(volunteers.length / itemsPerPage);

  const paginatedVolunteers = useMemo(() => {
    return volunteers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [volunteers, currentPage]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusChange(status: StatusFilter) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  function handleApproveVolunteer(volunteer: VolunteerApi) {
    setSelectedVolunteer(volunteer);
    setConfirmationAction("APPROVE");
  }

  function handleRejectVolunteer(volunteer: VolunteerApi) {
    setSelectedVolunteer(volunteer);
    setConfirmationAction("REJECT");
  }

  function handleCloseConfirmationModal() {
    if (isUpdatingStatus) return;

    setSelectedVolunteer(null);
    setConfirmationAction(null);
  }

  async function handleConfirmAction() {
    if (!selectedVolunteer || !confirmationAction) return;

    try {
      await updateVolunteerStatus({
        id: selectedVolunteer.id,
        status: confirmationAction === "APPROVE" ? "ACEITA" : "NEGADA",
      });

      toast.success("Status do voluntário atualizado com sucesso.");
      handleCloseConfirmationModal();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o status.");
    }
  }

  const columns: AdminTableColumn<VolunteerApi>[] = [
    {
      key: "name",
      title: "Nome",
      render: (volunteer) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary-orange) text-xs font-black text-white">
            {getInitials(volunteer.name)}
          </div>

          <span className="text-sm font-bold text-(--text-title)">
            {volunteer.name}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      title: "E-mail",
      render: (volunteer) => volunteer.email,
    },
    {
      key: "phone",
      title: "Telefone",
      render: (volunteer) => volunteer.phone,
    },
    {
      key: "availableSchedule",
      title: "Disponibilidade",
      render: (volunteer) => volunteer.availableSchedule,
    },
    {
      key: "status",
      title: "Status",
      render: (volunteer) => <StatusBadge status={volunteer.status} />,
    },
    {
      key: "createdAt",
      title: "Data da Inscrição",
      render: (volunteer) => formatDate(volunteer.createdAt),
    },
    {
      key: "actions",
      title: "Ações",
      thClassName: "text-center",
      tdClassName: "text-center",
      render: (volunteer) => (
        <ActionButtons
          item={volunteer}
          tooltipIdPrefix={`volunteer-${volunteer.id}`}
          canApproveOrReject={volunteer.status === "PENDENTE"}
          approveTooltip="Aceitar voluntário"
          rejectTooltip="Negar voluntário"
          onApprove={handleApproveVolunteer}
          onReject={handleRejectVolunteer}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-(--text-title)">
            Voluntários
          </h1>

          <p className="mt-2 text-sm font-medium text-(--text-muted)">
            Acompanhe e gerencie as inscrições de voluntários.
          </p>
        </div>
      </div>

      <StatusTabs
        selectedStatus={selectedStatus}
        onChangeStatus={handleStatusChange}
        counts={counts}
      />

      <div className="overflow-hidden rounded-xl border border-(--border-light) bg-(--bg-card) shadow-sm">
        <div className="flex flex-col gap-4 border-b border-(--border-light) p-5 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Buscar voluntário..."
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="h-10 w-full rounded-md border border-(--border-light) bg-(--bg-main) px-4 text-sm text-(--text-body) outline-none placeholder:text-(--text-muted) focus:border-(--primary-blue) md:max-w-[320px]"
          />

          <select
            value={selectedStatus}
            onChange={(event) =>
              handleStatusChange(event.target.value as StatusFilter)
            }
            className="h-10 w-full cursor-pointer rounded-md border border-(--border-light) bg-(--bg-main) px-4 text-sm font-medium text-(--text-body) outline-none focus:border-(--primary-blue) md:w-55"
          >
            <option value="ALL">Todos os status</option>
            <option value="PENDENTE">Pendente</option>
            <option value="ACEITA">Aceita</option>
            <option value="NEGADA">Negada</option>
          </select>
        </div>

        {isLoading && (
          <p className="p-6 text-sm font-semibold text-(--text-muted)">
            Carregando voluntários...
          </p>
        )}

        {isError && (
          <p className="p-6 text-sm font-semibold text-(--red-danger)">
            Não foi possível carregar os voluntários.
          </p>
        )}

        {!isLoading && !isError && (
          <AdminTable
            data={paginatedVolunteers}
            columns={columns}
            getRowKey={(volunteer) => volunteer.id}
            emptyMessage="Nenhum voluntário encontrado."
            minWidth="min-w-[980px]"
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmationModal
        isOpen={Boolean(selectedVolunteer && confirmationAction)}
        title={
          confirmationAction === "APPROVE"
            ? "Aceitar voluntário?"
            : "Negar voluntário?"
        }
        description={
          confirmationAction === "APPROVE"
            ? `Tem certeza que deseja aceitar a inscrição de ${selectedVolunteer?.name}?`
            : `Tem certeza que deseja negar a inscrição de ${selectedVolunteer?.name}?`
        }
        confirmText={confirmationAction === "APPROVE" ? "Aceitar" : "Negar"}
        variant={confirmationAction === "APPROVE" ? "success" : "danger"}
        isLoading={isUpdatingStatus}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmAction}
      />
    </AdminLayout>
  );
}
