import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Loan } from "@/types";

export const useGetLoan = (loanId: string) => {
  return useQuery({
    queryKey: ["loan", loanId],
    queryFn: async (): Promise<Loan> => {
      const response = await apiClient.get(`/loans/${loanId}`);
      return response.data as Loan;
    },
    enabled: !!loanId,
  });
};
