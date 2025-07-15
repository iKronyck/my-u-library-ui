import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { User } from "../../types/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const deleteUser = async (userId: string) => {
  const response = await apiClient.delete(`/users/${userId}/`);
  return response.data;
};

export const useDeleteUser = (userId: string) => {
  const queryClient = useQueryClient();
  const { push } = useRouter();

  return useMutation({
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.setQueryData(["users"], (oldData: User[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter((user) => user.id !== userId);
      });
      queryClient.removeQueries({ queryKey: ["users", userId] });
      toast.success("User deleted successfully");
      setTimeout(() => {
        push(`/dashboard/librarian/users`);
      }, 1500);
    },
    onError: () => {
      toast.error("Failed to delete user");
    },
  });
};
