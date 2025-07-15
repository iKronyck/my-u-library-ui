import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { BorrowedBook } from "@/types";

export function useGetBorrowedBooks() {
  return useQuery({
    queryKey: ["borrowedBooks"],
    queryFn: async (): Promise<BorrowedBook[]> => {
      const response = await apiClient.get("/my-loans/");
      return response.data as BorrowedBook[];
    },
  });
}
