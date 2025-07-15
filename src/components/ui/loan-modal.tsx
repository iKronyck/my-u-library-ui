"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { useLoanBook } from "@/hooks/loans";
import { useAuthStore } from "@/stores/auth-store";
import { Book } from "@/types";

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  onSuccess?: () => void;
}

export function LoanModal({
  isOpen,
  onClose,
  book,
  onSuccess,
}: LoanModalProps) {
  const { user } = useAuthStore();
  const { mutate: loanBook, isPending } = useLoanBook();
  const [dueDate, setDueDate] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !user || !dueDate) return;

    const dueDateISO = new Date(dueDate).toISOString();

    loanBook(
      {
        book_id: book.id,
        user_id: user.id,
        due_date: dueDateISO,
      },
      {
        onSuccess: () => {
          onSuccess?.();
          onClose();
          setDueDate("");
        },
      }
    );
  };

  const handleClose = () => {
    setDueDate("");
    onClose();
  };

  // Set minimum date to today
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30); // Max 30 days from today
  const maxDateStr = maxDate.toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">📚</span>
          <h3 className="text-lg font-semibold text-gray-900">
            Request Book Loan
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Title
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
              {book?.title}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">
              {book?.author}
            </p>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={today}
              max={maxDateStr}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Select a date between today and 30 days from now
            </p>
          </div>
        </form>

        <div className="flex justify-end space-x-3 mt-6">
          <Button
            title="Cancel"
            variant="secondary"
            onClick={handleClose}
            className="min-w-[80px]"
            disabled={isPending}
          />
          <Button
            title={isPending ? "Requesting..." : "Request Loan"}
            variant="primary"
            onClick={handleSubmit}
            className="min-w-[80px]"
            disabled={isPending || !dueDate}
          />
        </div>
      </div>
    </div>
  );
}
