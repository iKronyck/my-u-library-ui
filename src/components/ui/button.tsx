import { cn } from "@/lib";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: "primary" | "secondary";
}

export function Button({ title, variant = "primary", ...props }: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <button
      className={cn(
        "flex w-full items-center justify-center bg-primary text-white p-2 rounded-md font-bold hover:bg-pink-400 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-white border border-primary text-primary hover:bg-gray-100":
            !isPrimary,
        }
      )}
      {...props}
    >
      <h1 className="text-md font-bold text-center px-2">{title}</h1>
    </button>
  );
}
