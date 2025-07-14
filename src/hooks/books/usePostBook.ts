import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { Book, CreateBookRequest } from "@/types";
import { formatApiErrors, type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const postBook = async (data: CreateBookRequest) => {
  const response = await apiClient.post<CreateBookRequest>(`/books/`, data);
  return response.data;
};

export const usePostBook = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();
  return useMutation({
    mutationFn: (data: CreateBookRequest) => postBook(data),
    onSuccess: (createdBook) => {
      queryClient.setQueryData(["books"], (oldData: Book[] | undefined) => {
        if (!oldData) return [createdBook];
        return [...oldData, createdBook];
      });
      toast.success("Book created successfully");
      setTimeout(() => {
        push(`/dashboard/librarian/books`);
      }, 1500);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error?.response?.data) {
        const apiErrors = error.response.data;
        const formattedErrors = formatApiErrors(apiErrors);
        const errorMessage = Object.values(formattedErrors).join(", ");
        toast.error(errorMessage);
      } else {
        toast.error("Failed to create book");
      }
    },
  });
};
