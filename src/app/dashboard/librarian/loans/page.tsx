"use client";
import { useGetLoans } from "@/hooks/loans/librarian";
import { useRouter } from "next/navigation";

export default function LoansPage() {
  const { data: loans, isLoading, error } = useGetLoans();
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleRowClick = (loanId: string) => {
    router.push(`/dashboard/librarian/loans/${loanId}`);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Loan Management</h1>
        <p className="text-gray-600">Manage all library loans</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              All Loans ({loans?.length || 0})
            </h3>
          </div>

          {!loans || loans.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No loans found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no loans in the system.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Book
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrower
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loan Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loans.map((loan) => (
                    <tr
                      key={loan.id}
                      onClick={() => handleRowClick(loan.id)}
                      className="cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {loan.book_title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {loan.book_author}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {loan.user_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {loan.user_email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(loan.loan_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(loan.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
