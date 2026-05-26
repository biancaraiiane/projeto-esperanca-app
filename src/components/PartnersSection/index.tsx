"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { PartnerModal } from "@/components/Modals/PartnerModal";

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const partners: Partner[] = [
  {
    id: "1",
    name: "BCM",
    logo: "/parceiros/bcm.png",
  },
  {
    id: "2",
    name: "Unit",
    logo: "/parceiros/unit.png",
  },
  {
    id: "3",
    name: "Prefeitura de Aracaju",
    logo: "/parceiros/aracaju.png",
  },
];

function getCircularIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function PartnersSection() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  const visiblePartners = useMemo(() => {
    if (partners.length === 0) return [];

    const previous =
      partners[getCircularIndex(activeIndex - 1, partners.length)];
    const current = partners[getCircularIndex(activeIndex, partners.length)];
    const next = partners[getCircularIndex(activeIndex + 1, partners.length)];

    return [
      { partner: previous, position: "left" },
      { partner: current, position: "center" },
      { partner: next, position: "right" },
    ] as const;
  }, [activeIndex]);

  function handlePrevious() {
    setActiveIndex((current) => getCircularIndex(current - 1, partners.length));
  }

  function handleNext() {
    setActiveIndex((current) => getCircularIndex(current + 1, partners.length));
  }

  if (partners.length === 0) return null;

  return (
    <section
      id="parceiros"
      className="w-full bg-(--bg-main) px-5 py-16 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-black uppercase text-(--primary-green) md:text-4xl">
          Parceiros
        </h2>

        <div className="relative mx-auto flex h-47.5 max-w-190 items-center justify-center">
          {partners.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Parceiro anterior"
                className="absolute left-0 z-40 flex h-10 w-10 items-center justify-center rounded-full border-3 border-(--primary-green) bg-(--bg-card) text-(--primary-green) transition hover:scale-105 sm:left-2"
              >
                <FiArrowLeft size={24} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo parceiro"
                className="absolute right-0 z-40 flex h-10 w-10 items-center justify-center rounded-full border-3 border-(--primary-green) bg-(--bg-card) text-(--primary-green) transition hover:scale-105 sm:right-2"
              >
                <FiArrowRight size={24} />
              </button>
            </>
          )}

          <div className="relative h-40 w-full max-w-160">
            {visiblePartners.map(({ partner, position }) => {
              const isCenter = position === "center";

              return (
                <div
                  key={`${partner.id}-${position}`}
                  className={`
            absolute left-1/2 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-2xl bg-[#B8E889] shadow-md transition-all duration-500
            ${
              isCenter
                ? "z-30 h-33.7 w-62.5 -translate-x-1/2 scale-105 opacity-100 sm:h-36.25 sm:w-70"
                : "z-10 h-28.75 w-52.5 scale-95 opacity-75 sm:h-31.25 sm:w-57.5"
            }
            ${
              position === "left"
                ? "translate-x-[-118%]"
                : position === "right"
                  ? "translate-x-[18%]"
                  : ""
            }
          `}
                >
                  <div className="relative h-21.25 w-38.75 sm:h-23.75 sm:w-47.5">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsPartnerModalOpen(true)}
          className="mx-auto mt-8 block text-center text-lg font-medium uppercase tracking-wide text-(--primary-green) transition hover:scale-105 hover:text-(--primary-blue)"
        >
          Seja um parceiro você também
        </button>
      </div>

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
      />
    </section>
  );
}
