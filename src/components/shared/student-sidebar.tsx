"use client";

import { cn } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface StudentSidebarProps {
  className?: string;
}

const navigation = [
  {
    name: "Borrowed Books",
    href: "/dashboard/student",
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    name: "Available Books",
    href: "/dashboard/student/books",
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
];

export function StudentSidebar({ className }: StudentSidebarProps) {
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
            aria-label="Toggle sidebar"
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
              (item.href !== "/dashboard/student" &&
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
