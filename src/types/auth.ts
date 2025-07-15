export interface User {
  id: string;
  email: string;
  name?: string;
  role: "student" | "librarian";
}

export interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setUser: (user: User) => void;
  login: (token: string, user: User, refreshToken?: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export interface ResendMagicLinkRequest {
  email: string;
}

export interface ResendMagicLinkResponse {
  message: string;
}

export interface ResendMagicLinkError {
  error: string;
}

export interface MagicLoginRequest {
  token: string;
}

export interface MagicLoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    date_joined: string;
    role: "student" | "librarian";
  };
}

export interface MagicLoginError {
  error: string;
}
