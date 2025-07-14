// import { MovieDetail } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Book } from "@/types";

const getBooks = async () => {
  const response = await apiClient.get<Book[]>("/books");
  return response.data;
};

export const useGetBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: () => getBooks(),
  });
};
