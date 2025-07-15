import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { User } from "../../types/user";

const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/users/");
  return response.data;
};

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
