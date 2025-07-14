import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Book } from "@/types";

const getBook = async (id: string) => {
  const response = await apiClient.get<Book>(`/books/${id}`);
  return response.data;
};

export const useGetBook = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
    enabled: !!id,
  });
};
