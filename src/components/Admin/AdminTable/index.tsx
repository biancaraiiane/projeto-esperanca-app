"use client";

import type { ReactNode } from "react";

export interface AdminTableColumn<T> {
  key: string;
  title: string;
  render: (item: T) => ReactNode;
  thClassName?: string;
  tdClassName?: string;
}

interface AdminTableProps<T> {
  data: T[];
  columns: AdminTableColumn<T>[];
  emptyMessage?: string;
  minWidth?: string;
  getRowKey: (item: T) => string;
}

export function AdminTable<T>({
  data,
  columns,
  emptyMessage = "Nenhum registro encontrado.",
  minWidth = "min-w-[900px]",
  getRowKey,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full ${minWidth} border-collapse`}>
        <thead>
          <tr className="border-b border-(--border-light)">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-5 py-4 text-left text-xs font-black text-(--text-muted)
                  ${column.thClassName ?? ""}
                `}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={getRowKey(item)}
              className="border-b border-(--border-light) last:border-b-0"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`
                    px-5 py-4 text-sm text-(--text-body)
                    ${column.tdClassName ?? ""}
                  `}
                >
                  {column.render(item)}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-10 text-center text-sm font-semibold text-(--text-muted)"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}