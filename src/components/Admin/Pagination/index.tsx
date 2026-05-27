"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  function handlePreviousPage() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="flex cursor-pointer items-center gap-1 rounded-md bg-(--bg-card) px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium text-(--text-muted) shadow-sm transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiChevronLeft size={16} />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/* Pages list - hidden on small screens */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`
                cursor-pointer rounded-md px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-black shadow-sm transition hover:scale-105
                ${isActive ? "bg-(--primary-pink) text-white" : "bg-(--bg-card) text-(--text-title)"}
              `}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Compact mobile display */}
      <div className="flex items-center gap-2 sm:hidden">
        <span className="text-xs font-black text-(--text-title)">
          Pág {currentPage} de {totalPages}
        </span>
      </div>

      <button
        type="button"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="flex cursor-pointer items-center gap-1 rounded-md bg-(--bg-card) px-3 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium text-(--text-muted) shadow-sm transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="hidden sm:inline">Próximo</span>
        <FiChevronRight size={16} />
      </button>
    </div>
  );
}
