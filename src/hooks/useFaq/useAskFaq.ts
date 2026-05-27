import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface AskFaqPayload {
  message: string;
}

export interface AskFaqResponse {
  id?: string;
  question?: string;
  answer: string;
}

async function askFaqRequest(payload: AskFaqPayload) {
  const { data } = await api.post<AskFaqResponse>("/faq/ask", payload);

  return data;
}

export function useAskFaq() {
  return useMutation<AskFaqResponse, AxiosError, AskFaqPayload>({
    mutationFn: askFaqRequest,
  });
}