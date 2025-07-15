import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Loan } from "@/types";

export function useGetLoans() {
  return useQuery({
    queryKey: ["loans"],
    queryFn: async (): Promise<Loan[]> => {
      const response = await apiClient.get<Loan[]>("/loans/");
      return response.data as Loan[];
    },
  });
}
