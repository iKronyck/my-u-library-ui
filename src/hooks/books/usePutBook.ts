import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Book, UpdateBookRequest } from "@/types";
import { formatApiErrors, type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const putBook = async (id: string, data: UpdateBookRequest) => {
  const response = await apiClient.patch<Book>(`/books/${id}/`, data);
  return response.data;
};

export const usePutBook = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBookRequest) => putBook(id, data),
    onSuccess: (updatedBook) => {
      queryClient.setQueryData(["book", id], updatedBook);

      queryClient.setQueryData(["books"], (oldData: Book[] | undefined) => {
        if (!oldData) return [updatedBook];
        return oldData.map((book) => (book.id === id ? updatedBook : book));
      });
      toast.success("Book updated successfully");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error?.response?.data) {
        const apiErrors = error.response.data;
        const formattedErrors = formatApiErrors(apiErrors);
        const errorMessage = Object.values(formattedErrors).join(", ");
        toast.error(errorMessage);
      } else {
        toast.error("Failed to update book");
      }
    },
  });
};
