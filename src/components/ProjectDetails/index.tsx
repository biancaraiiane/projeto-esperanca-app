import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

import type { ProjectItem } from "@/data/projects";

interface ProjectDetailsProps {
  project: ProjectItem;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <section className="min-h-screen bg-(--bg-main) px-5 py-16 sm:px-8 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-6">
          <Link
            href="/#projetos"
            aria-label="Voltar para projetos"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#8AB1D8] text-white shadow-md transition hover:scale-105"
          >
            <FiArrowLeft size={34} />
          </Link>

          <h1 className="text-2xl font-black leading-tight text-(--primary-orange) md:text-3xl">
            {project.title}
          </h1>
        </div>

        <div className="rounded-[36px] bg-(--primary-orange) px-6 py-8 shadow-xl sm:px-10 md:px-14 lg:px-16">
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.galleryImages.map((image) => (
              <div
                key={image}
                className="relative h-45 overflow-hidden rounded-xl bg-white"
              >
                <Image
                  src={image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="space-y-6 text-base font-medium leading-relaxed text-white md:text-lg">
            {project.description.map((paragraph, index) => (
              <p key={`${project.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}