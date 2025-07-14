"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const queryClient = new QueryClient();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
            }}
          />
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
