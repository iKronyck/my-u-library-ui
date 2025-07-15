import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { LoanBookRequest } from "@/types";

export function useLoanBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoanBookRequest) => {
      const response = await apiClient.post("/loan-book/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["borrowedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}
