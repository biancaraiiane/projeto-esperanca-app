import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export const signInRequest = async (credentials: SignInCredentials) => {
  const { data } = await api.post<SignInResponse>("/auth/login", credentials);

  return data;
};

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError, SignInCredentials>({
    mutationFn: signInRequest,
  });
};