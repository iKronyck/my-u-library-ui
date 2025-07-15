"use client";
import { MainLayout } from "@/components/layouts";
import { ProtectedRoute } from "@/components/layouts";
import { useAuthStore } from "@/stores/auth-store";

export default function LibrarianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute requiredRole="student">
      <LibrarianLayoutContent>{children}</LibrarianLayoutContent>
    </ProtectedRoute>
  );
}

function LibrarianLayoutContent({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <MainLayout user={{ name: user?.name || "Usuario", role: "librarian" }}>
      {children}
    </MainLayout>
  );
}
