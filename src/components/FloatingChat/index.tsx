"use client";

import { useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiSend, FiX } from "react-icons/fi";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const QUICK_ACTIONS = [
  {
    label: "Quero ser voluntário",
    emoji: "🙋",
    className:
      "bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800",
  },
  {
    label: "Como doar?",
    emoji: "💚",
    className:
      "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  },
  {
    label: "Projetos",
    emoji: "🏠",
    className:
      "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  },
  {
    label: "Falar com atendente",
    emoji: "💬",
    className:
      "bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800",
  },
];

function getTime() {
  return new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "👋 Olá! Seja bem-vindo(a) ao\nProjeto Esperança! 💙\nComo podemos ajudar você hoje?",
    sender: "bot",
    time: getTime(),
  },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    setShowQuickActions(false);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, sender: "user", time: getTime() },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Obrigado pelo contato! Em breve um de nossos atendentes responderá. 💙",
          sender: "bot",
          time: getTime(),
        },
      ]);
    }, 900);
  };

  return (
    <>
      {/* ─── Painel do chat ──────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat do Projeto Esperança"
          className="fixed bottom-24 right-4 z-50 flex w-85 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl shadow-2xl"
          style={{ maxHeight: "520px", background: "var(--bg-card)" }}
        >
          {/* Cabeçalho */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "linear-gradient(135deg, #35CFE0 0%, #0057D9 100%)",
            }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl shadow">
              🏠
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                Fale com a Esperança
              </p>
              <p className="flex items-center gap-1.5 text-xs text-white/90">
                <span className="h-2 w-2 shrink-0 rounded-full bg-green-400" />
                Estamos online!
              </p>
            </div>

            <div className="flex items-center gap-0.5">
              <button
                aria-label="Mais opções"
                className="rounded p-1 text-white/80 transition hover:text-white"
              >
                <FiMoreVertical size={16} />
              </button>
              <button
                aria-label="Fechar chat"
                onClick={() => setIsOpen(false)}
                className="rounded p-1 text-white/80 transition hover:text-white  focus-visible:outline-2 focus-visible:outline-white"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Mensagens */}
          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            style={{ background: "var(--bg-section)" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-blue-600 text-white"
                      : "rounded-bl-none bg-white shadow-sm dark:bg-[#1e2124]"
                  }`}
                  style={
                    msg.sender === "bot" ? { color: "var(--text-body)" } : {}
                  }
                >
                  <p className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </p>
                  <p
                    className={`mt-1 text-[10px] ${
                      msg.sender === "user"
                        ? "text-right text-blue-200"
                        : "text-gray-400"
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Ações rápidas */}
          {showQuickActions && (
            <div
              className="grid grid-cols-2 gap-2 px-4 py-3"
              style={{ background: "var(--bg-section)" }}
            >
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  onClick={() => sendMessage(action.label)}
                  className={`flex items-center gap-1.5 rounded-xl border px-2 py-2 text-xs font-medium transition hover:opacity-75 ${action.className}`}
                >
                  <span>{action.emoji}</span>
                  <span className="leading-tight">{action.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Campo de entrada */}
          <div
            className="flex items-center gap-2 border-t px-3 py-3"
            style={{
              borderColor: "var(--border-light)",
              background: "var(--bg-card)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
              placeholder="Digite sua mensagem..."
              aria-label="Campo de mensagem"
              className="flex-1 rounded-full px-3 py-2 text-sm outline-none"
              style={{
                border: "1.5px solid var(--border-light)",
                background: "var(--bg-section)",
                color: "var(--text-body)",
              }}
            />
            <button
              aria-label="Enviar mensagem"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <FiSend size={15} />
            </button>
          </div>

          {/* Rodapé */}
          <div
            className="border-t py-2 text-center text-[10px]"
            style={{
              color: "var(--text-muted)",
              background: "var(--bg-card)",
              borderColor: "var(--border-light)",
            }}
          >
            Desenvolvido com carinho para você 💙
          </div>
        </div>
      )}

      {/* ─── Botão flutuante ─────────────────────────────────── */}
      <button
        aria-label={isOpen ? "Fechar chat" : "Abrir chat"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-lg transition hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        style={{
          background: "linear-gradient(135deg, #35CFE0 0%, #0057D9 100%)",
        }}
      >
        🏠
      </button>
    </>
  );
}
