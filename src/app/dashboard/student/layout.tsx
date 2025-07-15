"use client";
import { MainLayout } from "@/components/layouts";
import { ProtectedRoute } from "@/components/layouts";
import { useAuthStore } from "@/stores/auth-store";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="student">
      <StudentLayoutContent>{children}</StudentLayoutContent>
    </ProtectedRoute>
  );
}

function StudentLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <MainLayout user={{ name: user?.name || "Usuario", role: "student" }}>
      {children}
    </MainLayout>
  );
}
