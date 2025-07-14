import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Book } from "@/types";
import { formatApiErrors, type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const deleteBook = async (id: string) => {
  const response = await apiClient.delete<Book>(`/books/${id}/`);
  return response.data;
};

export const useDeleteBook = (id: string) => {
  const { replace } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBook(id),
    onSuccess: () => {
      queryClient.setQueryData(["book", id], undefined);

      queryClient.setQueryData(["books"], (oldData: Book[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((book) => book.id !== id);
      });
      toast.success("Book deleted successfully");
      setTimeout(() => {
        replace("/dashboard/librarian/books");
      }, 1500);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error?.response?.data) {
        const apiErrors = error.response.data;
        const formattedErrors = formatApiErrors(apiErrors);
        const errorMessage = Object.values(formattedErrors).join(", ");
        toast.error(errorMessage);
      } else {
        toast.error("Failed to delete book");
      }
    },
  });
};
