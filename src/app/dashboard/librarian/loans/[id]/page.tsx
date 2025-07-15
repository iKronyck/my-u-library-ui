"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Button, Modal } from "@/components/ui";
import {
  useGetLoan,
  useReturnLoan,
  useMarkLost,
} from "@/hooks/loans/librarian";

export default function LoanDetailPage() {
  const params = useParams();
  const loanId = params.id as string;

  const { data: loan, isLoading, error } = useGetLoan(loanId);
  const { mutate: returnLoan, isPending: isReturning } = useReturnLoan();
  const { mutate: markLost, isPending: isMarkingLost } = useMarkLost();

  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showMarkLostModal, setShowMarkLostModal] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!loan) return <div>Loan not found</div>;

  const handleReturn = () => {
    returnLoan(loanId, {
      onSuccess: () => {
        setShowReturnModal(false);
      },
    });
  };

  const handleMarkLost = () => {
    markLost(loanId, {
      onSuccess: () => {
        setShowMarkLostModal(false);
      },
    });
  };

  const getStatusColor = (status: string, isOverdue: boolean = false) => {
    if (isOverdue) {
      return "bg-red-100 text-red-800";
    }

    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      case "lost":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (
    status: string,
    isOverdue: boolean = false,
    daysRemaining: number = 0
  ) => {
    if (isOverdue) {
      return "Overdue";
    }

    switch (status) {
      case "active":
        return `Active (${daysRemaining} days left)`;
      case "overdue":
        return "Overdue";
      case "returned":
        return "Returned";
      case "lost":
        return "Lost";
      default:
        return "Unknown";
    }
  };

  const canReturn = loan.status === "active" || loan.status === "overdue";
  const canMarkLost = loan.status === "active" || loan.status === "overdue";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/librarian/loans"
            className="text-primary hover:text-primary/80 mb-4 inline-block"
          >
            ← Back to loans
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Loan Details</h1>
          <p className="text-gray-600">Manage this loan</p>
        </div>
        <div className="flex space-x-3">
          {canReturn && (
            <Button
              title="Return Book"
              variant="primary"
              onClick={() => setShowReturnModal(true)}
              className="h-12 w-40"
              disabled={isReturning}
            />
          )}
          {canMarkLost && (
            <Button
              title="Mark as Lost"
              variant="secondary"
              onClick={() => setShowMarkLostModal(true)}
              className="h-12 w-40"
              disabled={isMarkingLost}
            />
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Title
              </label>
              <p className="text-sm text-gray-900">{loan.book_title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Author
              </label>
              <p className="text-sm text-gray-900">{loan.book_author}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Borrower Name
              </label>
              <p className="text-sm text-gray-900">{loan.user_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Borrower Email
              </label>
              <p className="text-sm text-gray-900">{loan.user_email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Date
              </label>
              <p className="text-sm text-gray-900">
                {new Date(loan.loan_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <p className="text-sm text-gray-900">
                {new Date(loan.due_date).toLocaleDateString()}
              </p>
            </div>
            {loan.return_date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date
                </label>
                <p className="text-sm text-gray-900">
                  {new Date(loan.return_date).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                  loan.status,
                  loan.is_overdue
                )}`}
              >
                {getStatusText(
                  loan.status,
                  loan.is_overdue,
                  loan.days_remaining
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Return Confirmation Modal */}
      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        onConfirm={handleReturn}
        title="Return Book"
        message={`Are you sure you want to return "${loan.book_title}"?`}
        confirmText="Return"
        cancelText="Cancel"
        variant="info"
      />

      {/* Mark Lost Confirmation Modal */}
      <Modal
        isOpen={showMarkLostModal}
        onClose={() => setShowMarkLostModal(false)}
        onConfirm={handleMarkLost}
        title="Mark as Lost"
        message={`Are you sure you want to mark "${loan.book_title}" as lost?`}
        confirmText="Mark as Lost"
        cancelText="Cancel"
        variant="warning"
      />
    </div>
  );
}
