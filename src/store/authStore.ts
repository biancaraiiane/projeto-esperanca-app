import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  id: number;
  email: string;
  phone: string;
  name: string;
}

interface AuthState {
  userData: UserData | null;
  setUserData: (userData: UserData) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userData: null,

      setUserData: (userData) => {
        set({ userData });
      },

      clearSession: () => {
        set({ userData: null });
      },
    }),
    {
      name: "session",
    }
  )
);
