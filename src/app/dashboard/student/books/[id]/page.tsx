"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetBook } from "@/hooks/books";
import { useState } from "react";
import { Button, LoanModal } from "@/components/ui";
import { useGetBorrowedBooks } from "@/hooks/loans";

export default function StudentBookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;

  const { data: book, isLoading, error } = useGetBook(bookId);
  const { data: borrowedBooks } = useGetBorrowedBooks();
  const [showLoanModal, setShowLoanModal] = useState(false);

  // Check if the user has already borrowed this book
  const isAlreadyBorrowed = borrowedBooks?.some(
    (borrowedBook) =>
      borrowedBook.book_title === book?.title &&
      borrowedBook.status === "active"
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/student/books"
            className="text-primary hover:text-primary/80 mb-4 inline-block"
          >
            ← Back to books
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-gray-600">Book details</p>
        </div>
        <div>
          {book.stock_quantity > 0 && !isAlreadyBorrowed ? (
            <Button
              title="Request Loan"
              variant="primary"
              onClick={() => setShowLoanModal(true)}
            />
          ) : isAlreadyBorrowed ? (
            <span className="px-3 py-2 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
              Already Borrowed
            </span>
          ) : (
            <span className="px-3 py-2 bg-red-100 text-red-800 rounded-md text-sm font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <p className="text-sm text-gray-900">{book.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author
              </label>
              <p className="text-sm text-gray-900">{book.author}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <p className="text-sm text-gray-900 capitalize">{book.genre}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Published Year
              </label>
              <p className="text-sm text-gray-900">{book.published_year}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Copies
              </label>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  book.stock_quantity > 0
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {book.stock_quantity}{" "}
                {book.stock_quantity === 1 ? "copy" : "copies"} available
              </span>
            </div>
          </div>
        </div>
      </div>

      <LoanModal
        isOpen={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        book={book}
        onSuccess={() => {
          // The hook will automatically refetch the data
        }}
      />
    </div>
  );
}
