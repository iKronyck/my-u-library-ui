import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { MagicLoginResponse, MagicLoginError } from "../../types/auth";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";

const verifyMagicLink = async (token: string): Promise<MagicLoginResponse> => {
  const response = await apiClient.get<MagicLoginResponse>(
    `/magic-login?token=${token}`
  );
  return response.data;
};

export const useMagicLogin = () => {
  const { login } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (token: string) => verifyMagicLink(token),
    onSuccess: (response) => {
      const userData = {
        id: response.user.id,
        email: response.user.email,
        name: `${response.user.first_name} ${response.user.last_name}`.trim(),
        role: response.user.role,
      };

      login(response.access_token, userData);

      toast.success("Authentication successful");

      console.log(response.user.role);

      if (response.user.role === "librarian") {
        router.push("/dashboard/librarian");
      } else {
        router.push("/dashboard/student");
      }
    },
    onError: (error: AxiosError<MagicLoginError>) => {
      if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Error verifying token");
      }
    },
  });
};
