"use client";
import { useAuthStore } from "../../stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthRedirect() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      if (user.role === "librarian") {
        router.push("/dashboard/librarian");
      } else {
        router.push("/dashboard/student");
      }
    }
  }, [isAuthenticated, user, isLoading, router]);

  return null;
}
