import { PropsWithChildren } from "react";
import { cn } from "@/lib";

interface AuthLayoutProps extends PropsWithChildren {
  className?: string;
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div
      className={cn(
        "w-full min-h-screen flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
