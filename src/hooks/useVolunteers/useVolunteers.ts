import { api } from "@/api";
import type { ApiStatus, VolunteerApi } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface GetVolunteersFilters {
  name?: string;
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

export function useGetVolunteers(filters?: GetVolunteersFilters) {
  return useQuery({
    queryKey: ["volunteers", filters],
    queryFn: async () => {
      const { data } = await api.get("/volunteers", {
        params: {
          name: filters?.name || undefined,
          email: filters?.email || undefined,
          status: filters?.status || undefined,
          createdAt: filters?.createdAt || undefined,
        },
      });

      return normalizeArray<VolunteerApi>(data);
    },
  });
}

interface CreateVolunteerPayload {
  name: string;
  email: string;
  phone: string;
  availableSchedule: string;
}

export function useCreateVolunteer() {
  return useMutation({
    mutationFn: async (payload: CreateVolunteerPayload) => {
      const { data } = await api.post("/volunteers", payload);
      return data;
    },
  });
}

export function useUpdateVolunteerStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "ACEITA" | "NEGADA";
    }) => {
      const { data } = await api.patch(`/volunteers/${id}/status`, {
        status,
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["volunteers"] });
    },
  });
}