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
  useGetPartnerships,
  useUpdatePartnershipStatus,
} from "@/hooks/usePartnerships/usePartnerships";
import type { ApiStatus, PartnershipApi } from "@/types/api";
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

export default function ParceirosAdminPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedPartnership, setSelectedPartnership] =
    useState<PartnershipApi | null>(null);
  const [confirmationAction, setConfirmationAction] =
    useState<ConfirmationAction | null>(null);

  const {
    data: partnerships = [],
    isLoading,
    isError,
  } = useGetPartnerships({
    companyName: search,
    status: selectedStatus === "ALL" ? "" : selectedStatus,
  });

  const { mutateAsync: updatePartnershipStatus, isPending: isUpdatingStatus } =
    useUpdatePartnershipStatus();

  const counts = useMemo(() => {
    return {
      all: partnerships.length,
      pending: partnerships.filter(
        (partnership) => partnership.status === "PENDENTE"
      ).length,
      approved: partnerships.filter(
        (partnership) => partnership.status === "ACEITA"
      ).length,
      rejected: partnerships.filter(
        (partnership) => partnership.status === "NEGADA"
      ).length,
    };
  }, [partnerships]);

  const totalPages = Math.ceil(partnerships.length / itemsPerPage);

  const paginatedPartnerships = useMemo(() => {
    return partnerships.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [partnerships, currentPage]);

  function handleSearchChange(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleStatusChange(status: StatusFilter) {
    setSelectedStatus(status);
    setCurrentPage(1);
  }

  function handleApprovePartnership(partnership: PartnershipApi) {
    setSelectedPartnership(partnership);
    setConfirmationAction("APPROVE");
  }

  function handleRejectPartnership(partnership: PartnershipApi) {
    setSelectedPartnership(partnership);
    setConfirmationAction("REJECT");
  }

  function handleCloseConfirmationModal() {
    if (isUpdatingStatus) return;

    setSelectedPartnership(null);
    setConfirmationAction(null);
  }

  async function handleConfirmAction() {
    if (!selectedPartnership || !confirmationAction) return;

    try {
      await updatePartnershipStatus({
        id: selectedPartnership.id,
        status: confirmationAction === "APPROVE" ? "ACEITA" : "NEGADA",
      });

      toast.success("Status da parceria atualizado com sucesso.");
      handleCloseConfirmationModal();
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível atualizar o status.");
    }
  }

  const columns: AdminTableColumn<PartnershipApi>[] = [
    {
      key: "companyName",
      title: "Empresa",
      render: (partnership) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary-green) text-xs font-black text-white">
            {getInitials(partnership.companyName)}
          </div>

          <span className="text-sm font-bold text-(--text-title)">
            {partnership.companyName}
          </span>
        </div>
      ),
    },
    {
      key: "email",
      title: "E-mail",
      render: (partnership) => partnership.email,
    },
    {
      key: "phone",
      title: "Telefone",
      render: (partnership) => partnership.phone,
    },
    {
      key: "contact",
      title: "Contato",
      render: (partnership) => partnership.contact,
    },
    {
      key: "partnershipType",
      title: "Tipo de parceria",
      tdClassName: "max-w-[260px]",
      render: (partnership) => (
        <span className="line-clamp-2">{partnership.partnershipType}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (partnership) => <StatusBadge status={partnership.status} />,
    },
    {
      key: "createdAt",
      title: "Data da Solicitação",
      render: (partnership) => formatDate(partnership.createdAt),
    },
    {
      key: "actions",
      title: "Ações",
      thClassName: "text-center",
      tdClassName: "text-center",
      render: (partnership) => (
        <ActionButtons
          item={partnership}
          tooltipIdPrefix={`partnership-${partnership.id}`}
          canApproveOrReject={partnership.status === "PENDENTE"}
          approveTooltip="Aceitar parceria"
          rejectTooltip="Negar parceria"
          onApprove={handleApprovePartnership}
          onReject={handleRejectPartnership}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-(--text-title)">Parceiros</h1>

          <p className="mt-2 text-sm font-medium text-(--text-muted)">
            Acompanhe e gerencie as solicitações de parceria.
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
            placeholder="Buscar parceria..."
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
            Carregando parcerias...
          </p>
        )}

        {isError && (
          <p className="p-6 text-sm font-semibold text-(--red-danger)">
            Não foi possível carregar as parcerias.
          </p>
        )}

        {!isLoading && !isError && (
          <AdminTable
            data={paginatedPartnerships}
            columns={columns}
            getRowKey={(partnership) => partnership.id}
            emptyMessage="Nenhuma solicitação de parceria encontrada."
            minWidth="min-w-[1100px]"
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ConfirmationModal
        isOpen={Boolean(selectedPartnership && confirmationAction)}
        title={
          confirmationAction === "APPROVE"
            ? "Aceitar parceria?"
            : "Negar parceria?"
        }
        description={
          confirmationAction === "APPROVE"
            ? `Tem certeza que deseja aceitar a solicitação da empresa ${selectedPartnership?.companyName}?`
            : `Tem certeza que deseja negar a solicitação da empresa ${selectedPartnership?.companyName}?`
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
