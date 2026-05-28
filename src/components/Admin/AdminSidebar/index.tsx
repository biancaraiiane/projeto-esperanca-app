"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiLogOut, FiUser, FiUsers, FiX } from "react-icons/fi";
import { RiHandbagLine } from "react-icons/ri";

import { useAuthContext } from "@/context";
import { useTheme } from "@/context/ThemeContext";
import { useAuthStore } from "@/store/authStore";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    label: "Início",
    href: "/inicio",
    icon: FiHome,
  },
  {
    label: "Meu Perfil",
    href: "/perfil",
    icon: FiUser,
  },
  {
    label: "Voluntários",
    href: "/voluntarios",
    icon: FiUsers,
  },
  {
    label: "Parceiros",
    href: "/parceiros",
    icon: RiHandbagLine,
  },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { isDark, isMounted } = useTheme();
  const pathname = usePathname() || "/";
  const userData = useAuthStore((state) => state.userData);
  const { signOut } = useAuthContext();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50 flex h-screen w-62.5 flex-col overflow-hidden border-r border-(--border-light) bg-(--bg-card) transition-transform duration-300 dark:bg-(--bg-sidebar)
        ${isOpen ? "translate-x-0" : "translate-x-[-100%]"}
        lg:translate-x-0
      `}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar menu"
        className="absolute right-4 top-4 text-(--text-title) lg:hidden"
      >
        <FiX size={22} />
      </button>

      <div className="flex justify-center px-6 pb-6 pt-8">
        <Image
          src={isMounted && isDark ? "/logo-dark.png" : "/logo.png"}
          alt="Projeto Esperança"
          width={90}
          height={90}
          priority
          className="h-auto w-20.5"
        />
      </div>

      <div className="border-y border-(--border-light) px-6 py-5">
        <p className="text-sm font-semibold text-(--text-muted)">
          Bem-vindo,{" "}
          <span className="font-black text-(--text-title)">
            {userData?.name?.split(" ")[0] ?? "Admin"}
          </span>
        </p>

        <p className="mt-1 text-xs text-(--text-muted)">
          Painel Administrativo
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold transition
                ${isActive ? "bg-(--primary-pink) text-white" : "text-(--text-body) hover:bg-(--bg-section) dark:hover:bg-(--bg-card-soft)"}
              `}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}

        <button
          type="button"
          onClick={signOut}
          className="mt-auto flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-bold text-(--text-body) transition hover:bg-(--bg-section) dark:hover:bg-(--bg-card-soft)"
        >
          <FiLogOut size={18} />
          Sair
        </button>
      </nav>

      <div className="relative h-25 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 h-full w-full"
          viewBox="0 0 250 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 40C55 70 110 25 170 45C205 58 225 80 250 68V100H0V40Z"
            fill="var(--primary-orange)"
          />

          <path
            d="M0 58C75 80 125 35 185 52C220 62 235 75 250 73V100H0V58Z"
            fill="var(--primary-blue)"
          />

          <path
            d="M120 100C165 55 210 55 250 70V100H120Z"
            fill="var(--primary-green)"
          />
        </svg>
      </div>
    </aside>
  );
}
