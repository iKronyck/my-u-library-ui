"use client";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { AuthLayout } from "@/components/layouts";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";

export default function MagicLinkPage() {
  const searchParams = useSearchParams();
  const { handleMagicLinkAuth, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasProcessed = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setError("Token not found in URL");
      return;
    }

    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;

    handleMagicLinkAuth(token).catch((err) => {
      console.error("Error in magic link:", err);
      setError(err.message || "Error processing authentication");
      hasProcessed.current = false;
    });
  }, [searchParams, handleMagicLinkAuth]);

  if (error) {
    return (
      <AuthLayout className="bg-background">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl !shadow-md">
          <div className="text-center mb-8">
            <header className="flex justify-center items-center mb-4 flex-col">
              <Image src={Logo} alt="Logo" width={180} height={90} />
              <h1 className="text-2xl font-bold mt-5 text-text">
                MY U Library
              </h1>
            </header>
          </div>

          <div className="text-center">
            <div className="text-red-600 mb-4">
              <p className="font-semibold">Authentication Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <a href="/login" className="text-primary hover:underline">
              Back to login
            </a>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout className="bg-background">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl !shadow-md">
        <div className="text-center mb-8">
          <header className="flex justify-center items-center mb-4 flex-col">
            <Image src={Logo} alt="Logo" width={180} height={90} />
            <h1 className="text-2xl font-bold mt-5 text-text">MY U Library</h1>
          </header>
        </div>

        <div className="text-center">
          {isLoading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600">Verifying your authentication...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">Processing your access link...</p>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
