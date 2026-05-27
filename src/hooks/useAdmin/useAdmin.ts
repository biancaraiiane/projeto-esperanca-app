import { api } from "@/api";
import type {
  AdminMeApi,
  RegisterAdminPayload,
  UpdateAdminMePayload,
} from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetAdminMe() {
  return useQuery({
    queryKey: ["admin-me"],
    queryFn: async () => {
      const { data } = await api.get<AdminMeApi>("/admin/me");

      return data;
    },
  });
}

export function useUpdateAdminMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateAdminMePayload) => {
      const { data } = await api.put("/admin/me", payload);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-me"] });
    },
  });
}

export function useRegisterAdmin() {
  return useMutation({
    mutationFn: async (payload: RegisterAdminPayload) => {
      const { data } = await api.post("/auth/register", payload);

      return data;
    },
  });
}