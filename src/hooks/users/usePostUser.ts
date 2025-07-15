import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { User, CreateUserRequest } from "../../types/user";
import { formatApiErrors, type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const postUser = async (data: CreateUserRequest) => {
  const response = await apiClient.post<User>(
    `/users/`,
    data as unknown as User
  );
  return response.data;
};

export const usePostUser = () => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: (data: CreateUserRequest) => postUser(data),
    onSuccess: (createdUser) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [createdUser];
        return [...oldData, createdUser];
      });
      toast.success("User created successfully");
      setTimeout(() => {
        push(`/dashboard/librarian/users`);
      }, 1500);
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error?.response?.data) {
        const apiErrors = error.response.data;
        const formattedErrors = formatApiErrors(apiErrors);
        const errorMessage = Object.values(formattedErrors).join(", ");
        toast.error(errorMessage);
      } else {
        toast.error("Failed to create user");
      }
    },
  });
};
