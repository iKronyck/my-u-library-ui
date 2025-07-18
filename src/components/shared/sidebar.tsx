"use client";

import { cn } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard/librarian",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z"
        />
      </svg>
    ),
  },
  {
    name: "Books",
    href: "/dashboard/librarian/books",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    name: "Loans",
    href: "/dashboard/librarian/loans",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    name: "Users",
    href: "/dashboard/librarian/users",
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-all duration-500 ease-in-out",
        "lg:translate-x-0 lg:static lg:flex-shrink-0 lg:h-full",
        {
          "translate-x-0 w-64 shadow-xl": isOpen,
          "-translate-x-full w-16 shadow-none": !isOpen,
        },
        className
      )}
    >
      <div className="flex flex-col h-full w-full">
        <div className="hidden lg:flex items-center justify-center p-2 border-b border-gray-200">
          <button
            type="button"
            onClick={toggle}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
            aria-label="Alternar sidebar"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    : "M13 5l7 7-7 7M5 5l7 7-7 7"
                }
              />
            </svg>
          </button>
        </div>

        <nav
          className={cn("flex-1 py-6 space-y-2 transition-all duration-300", {
            "px-4": isOpen,
            "px-2": !isOpen,
          })}
        >
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard/librarian" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  {
                    "bg-primary text-white shadow-sm px-4": isActive,
                    "text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4":
                      !isActive,
                    "justify-center items-center": !isOpen,
                  }
                )}
              >
                <span
                  className={cn("transition-all duration-300", {
                    "mr-3": isOpen,
                    "mr-0": !isOpen,
                  })}
                >
                  {item.icon}
                </span>
                <span
                  className={cn(
                    "transition-all duration-300 whitespace-nowrap",
                    {
                      "opacity-100": isOpen,
                      "opacity-0 w-0 overflow-hidden": !isOpen,
                    }
                  )}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "p-4 border-t border-gray-200 transition-all duration-300",
            {
              "opacity-100": isOpen,
              "opacity-0": !isOpen,
            }
          )}
        >
          <div className="flex items-center text-xs text-gray-500">
            <span>© 2024 Library System</span>
          </div>
        </div>
      </div>
    </div>
  );
}
