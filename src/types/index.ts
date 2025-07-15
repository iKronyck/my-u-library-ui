export type {
  Book,
  CreateBookRequest,
  UpdateBookRequest,
  LoanBookRequest,
  BorrowedBook,
} from "./book";
export type {
  User,
  AuthState,
  ResendMagicLinkRequest,
  ResendMagicLinkResponse,
  ResendMagicLinkError,
  MagicLoginResponse,
  MagicLoginError,
} from "./auth";
export type {
  User as UserType,
  CreateUserRequest,
  UpdateUserRequest,
} from "./user";
export type { Loan, ReturnLoanRequest, MarkLostRequest } from "./loan";
export type { DashboardStats, ActivityFeedItem } from "./dashboard";
