import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { DashboardStats } from "@/types";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async (): Promise<DashboardStats> => {
      const response = await apiClient.get<DashboardStats>("/dashboard-stats/");
      return response.data as DashboardStats;
    },
  });
}
