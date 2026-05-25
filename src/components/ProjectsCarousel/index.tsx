"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import type { ProjectItem } from "@/data/projects";

interface ProjectsCarouselProps {
  projects: ProjectItem[];
  title?: string;
}

function getCircularIndex(index: number, length: number) {
  return ((index % length) + length) % length;
}

export function ProjectsCarousel({
  projects,
  title = "PROJETOS",
}: ProjectsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleProjects = useMemo(() => {
    if (projects.length === 0) return [];

    const previous = projects[getCircularIndex(activeIndex - 1, projects.length)];
    const current = projects[getCircularIndex(activeIndex, projects.length)];
    const next = projects[getCircularIndex(activeIndex + 1, projects.length)];

    return [
      { project: previous, position: "left" },
      { project: current, position: "center" },
      { project: next, position: "right" },
    ] as const;
  }, [activeIndex, projects]);

  function handlePrevious() {
    setActiveIndex((current) => getCircularIndex(current - 1, projects.length));
  }

  function handleNext() {
    setActiveIndex((current) => getCircularIndex(current + 1, projects.length));
  }

  if (projects.length === 0) return null;

  return (
    <section
      id="projetos"
      className="w-full bg-(--bg-section) px-5 py-20 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-5xl font-black uppercase leading-none text-(--primary-orange) xl:text-6xl">
          {title}
        </h2>

        <div className="relative mx-auto flex min-h-97.5 max-w-5xl items-center justify-center overflow-hidden">
          {projects.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Projeto anterior"
                className="absolute left-2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-orange) text-white shadow-xl transition hover:scale-105 sm:left-8"
              >
                <FiArrowLeft size={30} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Próximo projeto"
                className="absolute right-2 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-(--primary-orange) text-white shadow-xl transition hover:scale-105 sm:right-8"
              >
                <FiArrowRight size={30} />
              </button>
            </>
          )}

          <div className="relative flex w-full items-center justify-center">
            {visibleProjects.map(({ project, position }) => {
              const isCenter = position === "center";

              return (
                <Link
                  key={`${project.id}-${position}`}
                  href={`/projetos/${project.slug}`}
                  className={`
                    absolute overflow-hidden rounded-[20px] shadow-2xl transition-all duration-500
                    ${
                      isCenter
                        ? "z-20 h-82.5 w-130 scale-100 opacity-100"
                        : "z-10 hidden h-70 w-90 scale-90 opacity-45 blur-[1px] sm:block"
                    }
                    ${
                      position === "left"
                        ? "-translate-x-65"
                        : position === "right"
                          ? "translate-x-65"
                          : "translate-x-0"
                    }
                  `}
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3
                      className={`
                        max-w-90 font-black leading-tight text-white drop-shadow-md
                        ${isCenter ? "text-2xl" : "text-base"}
                      `}
                    >
                      {project.excerpt}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}