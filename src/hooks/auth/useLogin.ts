import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { type ApiError } from "@/lib";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  ResendMagicLinkRequest,
  ResendMagicLinkResponse,
  ResendMagicLinkError,
} from "../../types/auth";

const sendMagicLink = async (
  data: ResendMagicLinkRequest
): Promise<ResendMagicLinkResponse> => {
  const response = await apiClient.post<ResendMagicLinkResponse>(
    `/resend-magic-link/`,
    data as unknown as ResendMagicLinkResponse
  );
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: ResendMagicLinkRequest) => sendMagicLink(data),
    onSuccess: (response) => {
      toast.success(response.message || "Magic link sent to your email");
    },
    onError: (error: AxiosError<ResendMagicLinkError | ApiError>) => {
      if (error?.response?.data) {
        const errorData = error.response.data;

        if ("error" in errorData && errorData.error === "User not found") {
          toast.error("User not found. Verify your email.");
          return;
        }

        if ("error" in errorData) {
          const errorMessage = Array.isArray(errorData.error)
            ? errorData.error.join(", ")
            : errorData.error;
          toast.error(errorMessage);
          return;
        }

        toast.error("Error validating form");
      } else {
        toast.error("Error sending magic link");
      }
    },
  });
};
