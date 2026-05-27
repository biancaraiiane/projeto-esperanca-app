"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminTopbar } from "@/components/Admin/AdminTopbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="min-h-screen bg-(--bg-section) text-(--text-body) dark:bg-(--bg-main)">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <section className="min-h-screen px-5 py-6 lg:ml-62.5 lg:px-8 xl:px-12">
        <AdminTopbar onOpenSidebar={() => setIsSidebarOpen(true)} />

        {children}
      </section>
    </main>
  );
}