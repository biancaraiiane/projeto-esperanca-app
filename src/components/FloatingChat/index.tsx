"use client";

import { useRef, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FiMoreVertical, FiSend, FiX } from "react-icons/fi";

import { useAskFaq } from "@/hooks/useFaq/useAskFaq";

interface ChatMessage {
  id: string;
  text: string;
  sender: "bot" | "user";
  time: string;
}

interface QuickAction {
  label: string;
  icon: string;
  message: string;
  className: string;
}

function getCurrentTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

function createMessage(text: string, sender: "bot" | "user"): ChatMessage {
  return {
    id: crypto.randomUUID(),
    text,
    sender,
    time: getCurrentTime(),
  };
}

const initialMessages: ChatMessage[] = [
  {
    id: "1",
    text: "👋 Olá! Seja bem-vindo(a) ao Projeto Esperança! 💙\nComo podemos ajudar você hoje?",
    sender: "bot",
    time: getCurrentTime(),
  },
];

const quickActions: QuickAction[] = [
  {
    label: "Quero ser voluntário",
    icon: "🙋",
    message: "Quero ser voluntário",
    className:
      "border-[#27C9E8] bg-[#EFFFFF] text-(--primary-blue) dark:bg-[#09272D]",
  },
  {
    label: "Como doar?",
    icon: "💚",
    message: "Como doar?",
    className:
      "border-[#72E39B] bg-[#F0FFF5] text-[#008A36] dark:bg-[#0D2B18]",
  },
  {
    label: "Projetos",
    icon: "🏠",
    message: "Quais são os projetos?",
    className:
      "border-[#F3BF45] bg-[#FFFDF0] text-[#D87500] dark:bg-[#2B2108]",
  },
  {
    label: "Falar com atendente",
    icon: "💬",
    message: "Quero falar com atendente",
    className:
      "border-[#F6A7D7] bg-[#FFF3FA] text-(--primary-pink) dark:bg-[#2B1020]",
  },
];

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: askFaq, isPending } = useAskFaq();

  function addMessage(text: string, sender: "bot" | "user") {
    setMessages((prevState) => [...prevState, createMessage(text, sender)]);
  }

  async function handleSendMessage(customMessage?: string) {
    const finalMessage = customMessage ?? message.trim();

    if (!finalMessage || isPending) return;

    addMessage(finalMessage, "user");
    setMessage("");

    try {
      const response = await askFaq({
        message: finalMessage,
      });

      addMessage(response.answer, "bot");
    } catch (error) {
      console.error(error);

      addMessage(
        "Não consegui responder agora. Tente novamente em alguns instantes ou fale conosco pelos canais oficiais. 💙",
        "bot",
      );
    } finally {
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-5 z-200 flex h-140 w-85 max-w-[calc(100vw-40px)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-(--bg-card)">
          <header className="flex items-center justify-between bg-linear-to-r from-[#12BDE2] to-[#1163E8] px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-md">
                🏠
              </div>

              <div>
                <h2 className="text-sm font-black">Fale com a Esperança</h2>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#2BFF72]" />
                  <p className="text-xs font-medium">Estamos online!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Mais opções"
                className="cursor-pointer text-white transition hover:scale-110"
              >
                <FiMoreVertical size={20} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar chat"
                className="cursor-pointer text-white transition hover:scale-110"
              >
                <FiX size={22} />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto bg-[#F7F7F7] px-4 py-5 dark:bg-(--bg-main)">
            <div className="space-y-3">
              {messages.map((chatMessage) => (
                <div
                  key={chatMessage.id}
                  className={`flex ${
                    chatMessage.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm ${
                      chatMessage.sender === "user"
                        ? "rounded-br-none bg-[#2161F3] text-white"
                        : "rounded-bl-none bg-white text-(--text-body) dark:bg-(--bg-card) dark:text-(--text-title)"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                      {chatMessage.text}
                    </p>

                    <p
                      className={`mt-1 text-right text-[10px] ${
                        chatMessage.sender === "user"
                          ? "text-white/80"
                          : "text-(--text-muted)"
                      }`}
                    >
                      {chatMessage.time}
                    </p>
                  </div>
                </div>
              ))}

              {isPending && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-none bg-white px-4 py-3 text-sm font-medium text-(--text-muted) shadow-sm dark:bg-(--bg-card)">
                    Digitando...
                  </div>
                </div>
              )}
            </div>

            {messages.length === 1 && (
              <div className="mt-10 grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.message}
                    type="button"
                    disabled={isPending}
                    onClick={() => handleSendMessage(action.message)}
                    className={`
                      flex min-h-14.5 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-2 text-center text-xs font-black leading-tight transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60
                      ${action.className}
                    `}
                  >
                    <span>{action.icon}</span>
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-(--border-light) bg-white px-4 py-3 dark:bg-(--bg-card)">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                disabled={isPending}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="h-11 flex-1 rounded-full border border-(--border-light) bg-[#F7F7F7] px-4 text-sm text-(--text-body) outline-none placeholder:text-(--text-muted) focus:border-(--primary-blue) disabled:cursor-not-allowed disabled:opacity-70 dark:bg-(--bg-main)"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!message.trim() || isPending}
                aria-label="Enviar mensagem"
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#8EA9FF] text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiSend size={19} />
              </button>
            </div>
          </div>

          <footer className="border-t border-(--border-light) bg-white py-3 text-center dark:bg-(--bg-card)">
            <p className="text-[10px] font-medium text-(--text-muted)">
              Desenvolvido com carinho para você 💙
            </p>
          </footer>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prevState) => !prevState)}
        aria-label="Abrir chat"
        className="fixed bottom-8 right-8 z-190 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#23C8E3] to-[#1163E8] text-2xl text-white shadow-xl transition hover:scale-110"
      >
        <FaHome />
      </button>
    </>
  );
}