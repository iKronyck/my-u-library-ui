"use client";
import { AuthLayout } from "@/components/layouts";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";
import { useLogin } from "@/hooks/auth";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const { mutate: sendMagicLink, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }
    sendMagicLink({ email: email.trim() });
  };

  return (
    <AuthLayout className="bg-background">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl !shadow-md">
        <div className="text-center mb-8">
          <header className="flex justify-center items-center mb-4 flex-col">
            <Image src={Logo} alt="Logo" width={180} height={90} />
            <h1 className="text-2xl font-bold mt-5 text-text">MY U Library</h1>
          </header>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:placeholder:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            type="email"
            required
            disabled={isPending}
          />

          <button
            type="submit"
            disabled={isPending || !email.trim()}
            className="flex w-full items-center justify-center bg-primary text-white p-2 rounded-md font-bold hover:bg-pink-400 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Sending...</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-center">
                Send Magic Link
              </span>
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
