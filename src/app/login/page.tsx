"use client";
import { AuthLayout } from "@/components/layouts";
import Image from "next/image";
import Logo from "@/assets/svg/logo.svg";

export default function Login() {
  return (
    <AuthLayout className="bg-background">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl !shadow-md">
        <div className="text-center mb-8">
          <header className="flex justify-center items-center mb-4 flex-col">
            <Image src={Logo} alt="Logo" width={180} height={90} />
            <h1 className="text-2xl font-bold mt-5 text-text">MY U Library</h1>
          </header>
        </div>

        <form className="space-y-6">
          <input
            value=""
            onChange={() => {}}
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded-md focus:placeholder:text-primary"
            type="email"
          />

          <button
            type="submit"
            onClick={() => {
              // router.push("/dashboard");
            }}
            className="flex w-full items-center justify-center bg-primary text-white p-2 rounded-md font-bold hover:bg-pink-400 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <h1 className="text-lg font-bold text-center">Iniciar Sesión</h1>
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
