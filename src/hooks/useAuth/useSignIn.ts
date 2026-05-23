import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export interface SignInCredentials {
  email: string
  password: string
}

export interface Session {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

export const signInRequest = async (credentials: SignInCredentials) => {
  try {
    const { data } = await api.post<Session>("/login", credentials);
    return data;
  } catch (error: unknown) {
    return Promise.reject(error);
  }
};

export const useSignIn = () => {
  return useMutation<Session, AxiosError, SignInCredentials>({
    mutationFn: signInRequest,

  });
};