import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";

export function useMarkLost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: string) => {
      const response = await apiClient.post(`/loans/${loanId}/mark-lost/`);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch loans and dashboard stats
      queryClient.invalidateQueries({ queryKey: ["loans"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
  });
}
