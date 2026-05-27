import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface ResetPasswordPayload {
  token: string;
  password: string;
}

export const resetPasswordRequest = async (payload: ResetPasswordPayload) => {
  const { data } = await api.post("/auth/reset-password", payload);

  return data;
};

export const useResetPassword = () => {
  return useMutation<unknown, AxiosError, ResetPasswordPayload>({
    mutationFn: resetPasswordRequest,
  });
};