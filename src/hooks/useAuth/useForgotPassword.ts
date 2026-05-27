import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ForgotPasswordPayload {
  email: string;
}

export const forgotPasswordRequest = async (
  payload: ForgotPasswordPayload,
) => {
  const { data } = await api.post("/forgot-password", payload);

  return data;
};

export const useForgotPassword = () => {
  return useMutation<unknown, AxiosError, ForgotPasswordPayload>({
    mutationFn: forgotPasswordRequest,
  });
};