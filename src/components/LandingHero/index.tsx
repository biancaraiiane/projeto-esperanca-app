"use client";

import Image from "next/image";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { Button } from "@/components/Button";
import { DonationModal } from "@/components/Modals/DonationModal";
import { PartnerModal } from "@/components/Modals/PartnerModal";
import { VolunteerModal } from "@/components/Modals/VolunteerModal";
import { ThemeToggle } from "@/components/ThemeToggle";

import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  { label: "INÍCIO", href: "#inicio" },
  { label: "QUEM SOMOS", href: "#quem-somos" },
  { label: "PROJETOS", href: "#projetos" },
  { label: "INSTAGRAM", href: "#instagram" },
  { label: "PARCEIROS", href: "#parceiros" },
  { label: "TRANSPARÊNCIA", href: "#transparencia" },
  { label: "CONTATOS", href: "#contatos" },
];

export function LandingHero() {
const { isDark, isMounted } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);


  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden bg-(--bg-main)"
    >

      <div className="relative h-155 w-full overflow-hidden bg-linear-to-r from-[#ff3b2f] via-(--primary-orange) to-[#ff8a3d] lg:h-120 lg:bg-(--bg-main) xl:h-130">
        {/* Fundo completo com ondas: aparece somente em telas grandes */}
        <svg
          className="absolute inset-0 z-0 hidden h-full w-full lg:block"
          viewBox="0 0 1600 520"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="1600" height="215" fill="url(#orangeGradient)" />

          <path
            d="M680 178C835 80 1080 55 1340 75C1448 83 1540 100 1600 118V245C1450 218 1295 210 1160 230C1000 253 855 286 700 255C665 248 650 204 680 178Z"
            fill="var(--bg-main)"
          />

          <circle cx="430" cy="255" r="205" fill="var(--primary-yellow)" />

          <path
            d="M0 195C150 245 295 275 470 290C690 308 875 300 1095 255C1280 218 1450 215 1600 235V430H0V195Z"
            fill="var(--primary-green)"
          />

          <path
            d="M0 410C210 430 405 432 610 398C825 362 985 310 1195 318C1345 324 1480 340 1600 365V470H0V410Z"
            fill="var(--primary-orange)"
          />

          <path
            d="M0 425C220 465 435 480 660 450C895 420 1045 375 1280 376C1410 377 1515 392 1600 410V520H0V425Z"
            fill="var(--primary-cyan)"
          />

          <path
            d="M0 424C165 465 350 482 555 462C755 442 980 420 1240 418C1385 417 1498 420 1600 428V455C1490 448 1380 446 1240 447C980 449 760 464 545 480C335 498 150 475 0 438V424Z"
            fill="var(--primary-blue)"
          />

          <path
            d="M0 475C220 515 440 512 670 485C920 455 1180 460 1600 505V520H0V475Z"
            fill="var(--bg-main)"
          />

          <defs>
            <linearGradient
              id="orangeGradient"
              x1="0"
              y1="0"
              x2="1600"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ff3b2f" />
              <stop offset="0.5" stopColor="var(--primary-orange)" />
              <stop offset="1" stopColor="#ff8a3d" />
            </linearGradient>
          </defs>
        </svg>

        {/* Header */}
        <header className="absolute left-0 top-0 z-80 flex h-20.5 w-full items-start px-5 pt-3 sm:px-8 lg:px-12 xl:px-20">
          <Image
            src={isMounted && isDark ? "/logo-dark.png" : "/logo.png"}
            alt="Projeto Esperança"
            width={70}
            height={64}
            priority
            className="h-auto w-13.5 sm:w-15 lg:w-17"
          />

          {/* Menu desktop */}
          <nav className="ml-6 mt-5 hidden items-center gap-4 lg:ml-10 lg:flex lg:gap-6 xl:gap-7">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-black leading-none text-white transition hover:text-(--primary-yellow) lg:text-[14px] xl:text-[15px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto mt-1 flex items-center gap-3 lg:mt-2">
            <ThemeToggle />

            {/* Botão sanduíche mobile/tablet */}
            <button
              type="button"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-(--border-light) bg-(--bg-card) text-(--text-title) shadow-md transition hover:scale-105 lg:hidden"
            >
              {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>

          {/* Menu mobile/tablet */}
          {isMenuOpen && (
            <div className="absolute left-5 right-5 top-19 z-100 rounded-2xl border border-(--border-light) bg-(--bg-card) p-4 shadow-xl backdrop-blur-md lg:hidden">
              <nav className="flex flex-col gap-3">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-black text-(--text-title) transition hover:bg-(--bg-section)"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Menino atrás - aparece só em telas grandes */}
        <div className="absolute left-[25%] top-17.5 z-20 hidden h-53.75 w-51.25 lg:block xl:left-[26%] xl:top-15 xl:h-65.5 xl:w-60">
          <Image
            src="/menino-hero-340x420.PNG"
            alt="Menino com as mãos pintadas"
            fill
            priority
            sizes="(max-width: 1280px) 205px, 240px"
            className="object-contain"
          />
        </div>

        {/* Menina na frente - aparece só em telas grandes */}
        <div className="absolute left-[13%] top-38.75 z-30 hidden h-75 w-71.25 lg:block xl:left-[14%] xl:top-41.25 xl:h-87.5 xl:w-82.5">
          <Image
            src="/menina-hero-340x420.PNG"
            alt="Menina com as mãos pintadas"
            fill
            priority
            sizes="(max-width: 1280px) 285px, 330px"
            className="object-contain"
          />
        </div>

        {/* Título e botões */}
        <div className="absolute left-1/2 top-23.75 z-40 w-77.5 -translate-x-1/2 text-center lg:left-[54%] lg:top-23.75 lg:w-105 lg:translate-x-0 lg:text-left xl:left-[54%] xl:top-26.25 xl:w-125">
          <h1 className="leading-[0.9]">
            <span className="block text-[39px] font-black tracking-[-1.5px] text-(--primary-blue) sm:text-[44px] lg:text-[64px] xl:text-[78px]">
              Descubra a
            </span>

            <span className="block text-[38px] font-black italic tracking-[-1px] text-[#5B98F2] sm:text-[43px] lg:text-[62px] xl:text-[76px]">
              Esperança!
            </span>
          </h1>

          <div className="mx-auto mt-5 grid w-65 grid-cols-1 gap-3 sm:w-75 lg:mx-0 lg:mt-7 lg:w-97.5 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-4 xl:w-110">
            <Button
              variant="volunteer"
              size="lg"
              onClick={() => setIsVolunteerModalOpen(true)}
              className="w-full"
            >
              SEJA VOLUNTÁRIO
            </Button>

            <Button
              variant="donation"
              size="lg"
              onClick={() => setIsDonationModalOpen(true)}
              className="w-full"
            >
              DOAÇÃO
            </Button>

            <Button
              variant="partner"
              size="lg"
              onClick={() => setIsPartnerModalOpen(true)}
              className="w-full"
            >
              PARCEIRO
            </Button>
          </div>
        </div>
      </div>

      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />

      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />
    </section>
  );
}
