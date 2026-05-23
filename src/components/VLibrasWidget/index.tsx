"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    VLibras?: {
      Widget: new (url: string) => unknown;
    };
  }
}

const VLIBRAS_SCRIPT_ID = "vlibras-plugin-script";
const VLIBRAS_CSS_ID = "vlibras-plugin-css";

export function VLibrasWidget() {
  useEffect(() => {
    let attempts = 0;
    let intervalId: number | null = null;

    function ensureVLibrasCss() {
      const cssAlreadyExists = document.getElementById(VLIBRAS_CSS_ID);

      if (cssAlreadyExists) return;

      const link = document.createElement("link");
      link.id = VLIBRAS_CSS_ID;
      link.rel = "stylesheet";
      link.href = "https://vlibras.gov.br/app/vlibras-plugin.css";

      document.head.appendChild(link);
    }

    function initializeVLibras() {
      const container = document.querySelector("[vw]");
      const accessButton = document.querySelector("[vw-access-button]");
      const pluginWrapper = document.querySelector("[vw-plugin-wrapper]");

      if (!container || !accessButton || !pluginWrapper) return;
      if (!window.VLibras) return;

      try {
        new window.VLibras.Widget("https://vlibras.gov.br/app");

        container.classList.add("enabled");
        accessButton.classList.add("active");

        const htmlAccessButton = accessButton as HTMLElement;
        htmlAccessButton.style.zIndex = "999999";
      } catch (error) {
        console.error("Erro ao inicializar VLibras:", error);
      }
    }

    function loadVLibrasScript() {
      const existingScript = document.getElementById(
        VLIBRAS_SCRIPT_ID,
      ) as HTMLScriptElement | null;

      if (existingScript) {
        initializeVLibras();
        return;
      }

      const script = document.createElement("script");
      script.id = VLIBRAS_SCRIPT_ID;
      script.src = "https://vlibras.gov.br/app/vlibras-plugin.js";
      script.async = true;

      script.onload = () => {
        initializeVLibras();
      };

      document.body.appendChild(script);
    }

    function startRetry() {
      intervalId = window.setInterval(() => {
        attempts += 1;

        initializeVLibras();

        const accessButton = document.querySelector(
          "[vw-access-button]",
        ) as HTMLElement | null;

        const buttonExists = Boolean(accessButton);
        const buttonHasContent =
          Boolean(accessButton?.children.length) ||
          Boolean(accessButton?.classList.contains("active"));

        if ((buttonExists && buttonHasContent) || attempts >= 30) {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
        }
      }, 500);
    }

    ensureVLibrasCss();
    loadVLibrasScript();

    const timeoutId = window.setTimeout(() => {
      initializeVLibras();
      startRetry();
    }, 800);

    return () => {
      window.clearTimeout(timeoutId);

      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div {...({ vw: "" } as Record<string, string>)} className="enabled">
      <div
        {...({ "vw-access-button": "" } as Record<string, string>)}
        className="active"
      />

      <div {...({ "vw-plugin-wrapper": "" } as Record<string, string>)}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}