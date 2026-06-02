"use client";

import { useMemo, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiExternalLink,
  FiFileText,
  FiX,
} from "react-icons/fi";

export interface TransparencyColumn {
  key: string;
  label: string;
  isFile?: boolean;
}

export interface TransparencyDocument {
  id: string;
  year?: string;
  name?: string;
  type?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  expenseType?: string;
  value?: string;
  fileUrl?: string;
  noteUrl?: string;
  disabled?: boolean;
}

export interface TransparencyModalData {
  title: string;
  description: string;
  variant: "yellow" | "purple" | "green" | "cyan" | "pink" | "red";
  columns: TransparencyColumn[];
  documents: TransparencyDocument[];
}

interface TransparencyModalProps {
  isOpen: boolean;
  data: TransparencyModalData | null;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 7;

const modalIconClasses: Record<TransparencyModalData["variant"], string> = {
  yellow:
    "bg-[#FFF4BE] text-[#111111] dark:bg-[#2A2514] dark:text-[#F5D96B]",
  purple:
    "bg-[#CDA1F2] text-[#111111] dark:bg-[#241730] dark:text-[#D7A8FF]",
  green:
    "bg-[#C9FA7B] text-[#111111] dark:bg-[#1E2D14] dark:text-[#B8F56A]",
  cyan:
    "bg-[#91D7F5] text-[#111111] dark:bg-[#102936] dark:text-[#7DDCFF]",
  pink:
    "bg-[#FF7FC3] text-[#111111] dark:bg-[#341528] dark:text-[#FF8DCC]",
  red:
    "bg-[#FF8D8D] text-[#111111] dark:bg-[#361818] dark:text-[#FF9999]",
};

function getDocumentValue(document: TransparencyDocument, key: string) {
  const value = document[key as keyof TransparencyDocument];

  if (!value) {
    return "-";
  }

  return String(value);
}

export function TransparencyModal({
  isOpen,
  data,
  onClose,
}: TransparencyModalProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!data) return 1;

    return Math.ceil(data.documents.length / ITEMS_PER_PAGE) || 1;
  }, [data]);

  const paginatedDocuments = useMemo(() => {
    if (!data) return [];

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return data.documents.slice(start, end);
  }, [data, currentPage]);

  function handleClose() {
    setCurrentPage(1);
    onClose();
  }

  function handleOpenFile(url?: string) {
    if (!url) return;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl rounded-3xl bg-(--bg-card) p-5 shadow-2xl dark:border dark:border-white/10 dark:bg-[#07111f] sm:p-8">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#D6E3FF] bg-white text-[#1F3B75] shadow-sm transition hover:scale-105 hover:bg-[#F3F8FF] dark:border-white/10 dark:bg-white/5 dark:text-white"
          aria-label="Fechar modal"
        >
          <FiX size={24} />
        </button>

        <div className="mb-8 flex items-center gap-5 pr-12">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${modalIconClasses[data.variant]}`}
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-md border-3 border-current">
              <FiFileText size={30} />
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-black text-(--text-title) dark:text-white md:text-3xl">
              {data.title}
            </h3>

            <p className="mt-2 text-sm font-medium text-(--text-body) dark:text-white/70 md:text-base">
              {data.description}
            </p>
          </div>
        </div>

        <div className="mb-8 flex items-center gap-8">
          <div className="h-px flex-1 bg-[#BFD9FF]" />
          <span className="text-3xl text-[#0D6BFF]">💙</span>
          <div className="h-px flex-1 bg-[#BFD9FF]" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#4F76F6] bg-white dark:border-white/10 dark:bg-white/5">
          <div className="max-h-107.5 overflow-auto">
            <table className="w-full min-w-212.5 border-collapse text-center">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#4F76F6] text-white">
                  {data.columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-5 py-4 text-base font-extrabold"
                    >
                      {column.label}
                    </th>
                  ))}

                  <th className="px-5 py-4 text-base font-extrabold">
                    Arquivo
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedDocuments.map((document) => (
                  <tr
                    key={document.id}
                    className="border-b border-[#9AB1FF] text-[#17213D] last:border-b-0 dark:border-white/10 dark:text-white"
                  >
                    {data.columns.map((column) => (
                      <td
                        key={column.key}
                        className="max-w-82.5 px-5 py-4 text-sm font-medium md:text-base"
                      >
                        {column.isFile ? (
                          getDocumentValue(document, column.key) !== "-" ? (
                            <button
                              type="button"
                              onClick={() =>
                                handleOpenFile(
                                  getDocumentValue(document, column.key),
                                )
                              }
                              disabled={document.disabled}
                              className="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#D6E3FF] bg-white text-[#EF4444] shadow-sm transition hover:scale-105 hover:bg-[#F3F8FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/10"
                              aria-label={`Abrir ${column.label}`}
                            >
                              <FiExternalLink size={20} />
                            </button>
                          ) : (
                            <span className="text-sm text-[#94A3B8]">-</span>
                          )
                        ) : (
                          getDocumentValue(document, column.key)
                        )}
                      </td>
                    ))}

                    <td className="px-5 py-4">
                      {document.fileUrl ? (
                        <button
                          type="button"
                          onClick={() => handleOpenFile(document.fileUrl)}
                          disabled={document.disabled}
                          className="mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#D6E3FF] bg-white text-[#EF4444] shadow-sm transition hover:scale-105 hover:bg-[#F3F8FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-white/10"
                          aria-label="Abrir documento"
                        >
                          <FiExternalLink size={20} />
                        </button>
                      ) : (
                        <span className="text-sm text-[#94A3B8]">-</span>
                      )}
                    </td>
                  </tr>
                ))}

                {paginatedDocuments.length === 0 && (
                  <tr>
                    <td
                      colSpan={data.columns.length + 1}
                      className="px-5 py-10 text-center text-[#64748B]"
                    >
                      Nenhum documento cadastrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-[#D6E3FF] px-5 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-[#50607A] dark:text-white/70">
              Mostrando {paginatedDocuments.length} de {data.documents.length}{" "}
              documentos
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#D6E3FF] text-[#4F76F6] transition hover:bg-[#F3F8FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white"
                aria-label="Página anterior"
              >
                <FiChevronLeft size={20} />
              </button>

              <span className="flex h-10 min-w-10 items-center justify-center rounded-lg bg-[#4F76F6] px-4 font-bold text-white">
                {currentPage}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[#D6E3FF] text-[#4F76F6] transition hover:bg-[#F3F8FF] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:text-white"
                aria-label="Próxima página"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}