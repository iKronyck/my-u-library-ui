"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useGetBook } from "@/hooks/books";

export default function BookDetailPage() {
  const params = useParams();
  const { push } = useRouter();
  const bookId = params.id as string;

  const { data: book, isLoading, error } = useGetBook(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/librarian/books"
            className="text-primary hover:text-primary/80 mb-4 inline-block"
          >
            ← Volver al catálogo
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-gray-600">Detalles del libro</p>
        </div>
        <div className="flex space-x-3">
          <button
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            onClick={() => push(`/dashboard/librarian/books/${bookId}/edit`)}
          >
            Editar
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Eliminar
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Título</dt>
              <dd className="mt-1 text-sm text-gray-900">{book.title}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Autor</dt>
              <dd className="mt-1 text-sm text-gray-900">{book.author}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Género</dt>
              <dd className="mt-1 text-sm text-gray-900">{book.genre}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Año de publicación
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {book.published_year}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Cantidad en stock
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {book.stock_quantity}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                ID del libro
              </dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">
                {book.id}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Fecha de creación
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(book.created_at).toLocaleDateString("es-ES")}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">
                Última actualización
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(book.updated_at).toLocaleDateString("es-ES")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
