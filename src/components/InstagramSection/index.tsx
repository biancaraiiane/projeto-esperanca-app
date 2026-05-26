"use client";

import Script from "next/script";
import { useEffect } from "react";

const instagramUrl = "https://www.instagram.com/projeto.esperanca.ofc/";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function InstagramSection() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <section
      id="instagram"
      className="w-full bg-(--bg-main) px-5 py-16 sm:px-8 lg:px-12 xl:px-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center">
        <h2 className="mb-6 text-center text-3xl font-black uppercase text-(--primary-cyan) md:text-4xl">
          Nosso Instagram
        </h2>

        <div className="w-full max-w-135 overflow-hidden rounded-3xl border border-(--border-light) bg-(--bg-card) p-4 shadow-xl">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={instagramUrl}
            data-instgrm-version="14"
            style={{
              background: "#fff",
              border: 0,
              borderRadius: "16px",
              boxShadow: "none",
              margin: "0 auto",
              maxWidth: "540px",
              minWidth: "326px",
              padding: 0,
              width: "100%",
            }}
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver perfil do Projeto Esperança no Instagram
            </a>
          </blockquote>
        </div>
      </div>

      <Script
        src="https://www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.instgrm?.Embeds.process();
        }}
      />
    </section>
  );
}
