import { api } from "@/api";
import type { ApiStatus, PartnershipApi } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface GetPartnershipsFilters {
  companyName?: string;
  email?: string;
  status?: ApiStatus | "";
  createdAt?: string;
}

function normalizeArray<T>(responseData: unknown): T[] {
  if (Array.isArray(responseData)) {
    return responseData as T[];
  }

  if (
    responseData &&
    typeof responseData === "object" &&
    "data" in responseData &&
    Array.isArray((responseData as { data: unknown }).data)
  ) {
    return (responseData as { data: T[] }).data;
  }

  return [];
}

export function useGetPartnerships(filters?: GetPartnershipsFilters) {
  return useQuery({
    queryKey: ["partnerships", filters],
    queryFn: async () => {
      const { data } = await api.get("/partnerships", {
        params: {
          companyName: filters?.companyName || undefined,
          email: filters?.email || undefined,
          status: filters?.status || undefined,
          createdAt: filters?.createdAt || undefined,
        },
      });

      return normalizeArray<PartnershipApi>(data);
    },
  });
}

export function useUpdatePartnershipStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "ACEITA" | "NEGADA";
    }) => {
      const { data } = await api.patch(`/partnerships/${id}/status`, {
        status,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partnerships"] });
    },
  });
}