"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
} from "react";

import { api, setUnauthorizedCallback } from "@/api";
import { useAuthStore } from "@/store/authStore";
import { useUserRoleStore } from "@/store/useUserRoleStore";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "sonner";

import { SignInCredentials, useSignIn } from "../hooks/useAuth/useSignIn";

interface AdminMeResponse {
  id: string;
  name: string;
  email: string;
  birthDate?: string;
}

export interface AuthContextProps {
  handleSignIn: (credentials: SignInCredentials) => void;
  signOut: () => void;
  isPending: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const { mutateAsync: signIn, isPending } = useSignIn();
  const { setUserData, clearSession } = useAuthStore();
  const { setRole, clearRole } = useUserRoleStore();

  useEffect(() => {
    setUnauthorizedCallback(() => {
      destroyCookie(undefined, "@ESPERANCA:T");
      clearSession();
      clearRole();
      router.push("/login");
    });
  }, [clearRole, clearSession, router]);

  useEffect(() => {
    const { "@ESPERANCA:T": token } = parseCookies();

    if (!token) return;

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    async function fetchAdminMe() {
      try {
        const { data } = await api.get<AdminMeResponse>("/admin/me");

        setUserData(data);
        setRole("ADMIN");
      } catch (error) {
        console.error(error);
      }
    }

    fetchAdminMe();
  }, [setRole, setUserData]);

  const handleSignIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const data = await signIn({ email, password });

        const { token } = data;
        const isProduction = process.env.NODE_ENV === "production";

        setCookie(undefined, "email", email, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: isProduction,
          sameSite: "strict",
        });

        setCookie(undefined, "@ESPERANCA:T", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: isProduction,
          sameSite: "strict",
        });

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const { data: admin } = await api.get<AdminMeResponse>("/admin/me");

        setUserData(admin);
        setRole("ADMIN");

        router.push("/inicio");
      } catch (error) {
        console.error(error);
        toast.error("E-mail ou senha inválidos.");
      }
    },
    [router, setRole, setUserData, signIn],
  );

  const signOut = useCallback(() => {
    destroyCookie(undefined, "@ESPERANCA:T");
    clearSession();
    clearRole();
    router.push("/login");
  }, [clearRole, clearSession, router]);

  const cachedValue = useMemo(() => {
    return {
      handleSignIn,
      isPending,
      signOut,
    };
  }, [handleSignIn, isPending, signOut]);

  return (
    <AuthContext.Provider value={cachedValue}>{children}</AuthContext.Provider>
  );
}