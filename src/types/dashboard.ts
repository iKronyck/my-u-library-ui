export interface DashboardStats {
  total_books: number;
  active_users: number;
  active_loans: number;
  overdue_loans: number;
  returned_loans: number;
  lost_books: number;
  total_loans: number;
}

export interface ActivityFeedItem {
  id: string;
  user_name: string;
  book_title: string;
  action: string;
  action_display: string;
  icon: string;
  timestamp: string;
  is_late: boolean;
  days_late: number;
}
