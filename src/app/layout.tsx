import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AuthProvider } from "@/context/provider";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "sonner";
import "./globals.css";

import QueryProvider from "./queryProvider";

export const metadata: Metadata = {
  title: "Projeto Esperança",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
            <Toaster richColors position="top-right" />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
