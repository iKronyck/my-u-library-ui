import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { ActivityFeedItem } from "@/types";

export const useActivityFeed = () => {
  return useQuery({
    queryKey: ["activity-feed"],
    queryFn: async (): Promise<ActivityFeedItem[]> => {
      const response = await apiClient.get("/activity-feed");
      return response.data as ActivityFeedItem[];
    },
  });
};
