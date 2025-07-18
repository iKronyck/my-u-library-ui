"use client";
import { Header, Sidebar, StudentSidebar } from "@/components/shared";

interface MainLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    role: string;
  };
}

export function MainLayout({ children, user }: MainLayoutProps) {
  const isStudent = user?.role === "student";

  return (
    <main className="h-dvh bg-background flex flex-col">
      <Header user={user} />
      <main className="flex flex-1 overflow-hidden">
        {isStudent ? <StudentSidebar /> : <Sidebar />}
        <main className="flex-1 overflow-y-auto ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </main>
    </main>
  );
}
