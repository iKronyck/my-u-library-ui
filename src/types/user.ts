export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
  date_joined: string;
  is_active: boolean;
}

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  role: "student" | "librarian";
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email?: string;
  role?: "student" | "librarian";
  is_active: boolean;
}
