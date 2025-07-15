import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { User, UpdateUserRequest } from "../../types/user";
import { formatApiErrors, type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const putUser = async ({
  userId,
  data,
}: {
  userId: string;
  data: UpdateUserRequest;
}) => {
  const response = await apiClient.put<User>(
    `/users/${userId}/`,
    data as unknown as User
  );
  return response.data;
};

export const usePutUser = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => putUser({ userId, data }),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [updatedUser];
        return oldData.map((user) => (user.id === userId ? updatedUser : user));
      });
      queryClient.setQueryData(["users", userId], updatedUser);
      toast.success("User updated successfully");
    },
    onError: (error: AxiosError<ApiError>) => {
      if (error?.response?.data) {
        const apiErrors = error.response.data;
        const formattedErrors = formatApiErrors(apiErrors);
        const errorMessage = Object.values(formattedErrors).join(", ");
        toast.error(errorMessage);
      } else {
        toast.error("Failed to update user");
      }
    },
  });
};
