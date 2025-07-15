export interface Loan {
  id: string;
  book_title: string;
  book_author: string;
  user_name: string;
  user_email: string;
  loan_date: string;
  due_date: string;
  return_date: string | null;
  status: "active" | "overdue" | "returned" | "lost";
  is_overdue: boolean;
  days_remaining: number;
}

export interface ReturnLoanRequest {
  loan_id: string;
}

export interface MarkLostRequest {
  loan_id: string;
}
