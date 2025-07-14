export interface Book {
  id: string;
  title: string;
  author: string;
  published_year: number;
  genre: string;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  published_year: number;
  genre: string;
  stock_quantity: number;
}

export interface UpdateBookRequest {
  id: string;
  title?: string;
  author?: string;
  published_year?: number;
  genre?: string;
  stock_quantity?: number;
}
