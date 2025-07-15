import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { User } from "../../types/user";

const getUser = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}/`);
  return response.data;
};

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
