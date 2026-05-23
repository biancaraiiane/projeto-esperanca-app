"use client";
import { useRouter } from "next/navigation";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { api } from "@/api";
import { setUnauthorizedCallback } from "@/api";
import { useAuthStore } from "@/store/authStore";
import { useUserRoleStore } from "@/store/useUserRoleStore";
import { jwtDecode } from "jwt-decode";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { toast } from "sonner";

import { SignInCredentials, useSignIn } from "../hooks/useAuth/useSignIn";

interface DecodedToken {
  role: string;
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
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUnauthorizedCallback(() => {
      destroyCookie(undefined, "@ESPERANÇA:T");
      clearSession();
      clearRole();
      router.push("/");
    });
  }, [clearRole, clearSession, router]);

  useEffect(() => {
    const { "@ESPERANÇA:T": token } = parseCookies();

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const fetchUserData = async () => {
        try {
          if (email) {
            const { data } = await api.get("/users/me");
            setUserData(data);
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, [email, setUserData]);

  const handleSignIn = useCallback(
    async ({ email, password }: SignInCredentials) => {
      try {
        const data = await signIn({ email, password });
        console.log("LOGIN RESPONSE:", data);
        const { token } = data;

        console.log(data);
        setUserData(data.user); 
        const isProduction = process.env.NODE_ENV === "production";

        setCookie(undefined, "email", data.user.email, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: isProduction,
          sameSite: "strict",
        });

        setCookie(undefined, "@ESPERANÇA:T", token, {
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
          secure: isProduction,
          sameSite: "strict",
        });
        setEmail(email);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const decoded = jwtDecode<DecodedToken>(token);

        const role = decoded.role?.toUpperCase();
        setRole(role);
        router.push("/products");
      } catch (error) {
        console.error(error);
        toast.error("Invalid email or password");
      }
    },
    [router, setRole, setUserData, signIn]
  );

  const signOut = useCallback(() => {
    destroyCookie(undefined, "@ESPERANÇA:T");
    clearSession();
    clearRole();
    router.push("/");
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
