export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  published_year: number;
  stock_quantity: number;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  published_year: number;
  stock_quantity: number;
}

export interface UpdateBookRequest {
  title: string;
  author: string;
  genre: string;
  published_year: number;
  stock_quantity: number;
}

export interface LoanBookRequest {
  book_id: string;
  user_id: string;
  due_date: string;
}

export interface BorrowedBook {
  id: string;
  book_title: string;
  book_author: string;
  loan_date: string;
  due_date: string;
  return_date: string | null;
  status: "active" | "overdue" | "returned" | "lost";
  is_overdue: boolean;
  days_remaining: number;
}
