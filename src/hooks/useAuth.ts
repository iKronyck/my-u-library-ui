import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useMagicLogin } from "./auth";

export const useAuth = () => {
  const router = useRouter();
  const { token, refreshToken, user, isAuthenticated, isLoading, logout } =
    useAuthStore();
  const { mutate: verifyMagicLink, isPending: isVerifying } = useMagicLogin();

  const handleMagicLinkAuth = useCallback(
    async (token: string) => {
      verifyMagicLink(token);
    },
    [verifyMagicLink]
  );

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  return {
    token,
    refreshToken,
    user,
    isAuthenticated,
    isLoading: isLoading || isVerifying,
    handleMagicLinkAuth,
    handleLogout,
  };
};
