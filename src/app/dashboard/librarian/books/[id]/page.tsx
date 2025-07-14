"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetBook, usePutBook, useDeleteBook } from "@/hooks/books";
import { useState } from "react";
import { Button, Input, Modal } from "@/components/ui";

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;

  const { data: book, isLoading, error } = useGetBook(bookId);
  const { mutate: putBook } = usePutBook(bookId);
  const { mutate: deleteBook } = useDeleteBook(bookId);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
    stock_quantity: "",
  });

  if (book && !formData.title) {
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      published_year: book.published_year.toString(),
      stock_quantity: book.stock_quantity.toString(),
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    putBook({
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      published_year: parseInt(formData.published_year),
      stock_quantity: parseInt(formData.stock_quantity),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        published_year: book.published_year.toString(),
        stock_quantity: book.stock_quantity.toString(),
      });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteBook();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

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
            ← Back to books
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-gray-600">
            {isEditing ? "Editing book" : "Book details"}
          </p>
        </div>
        {/*  */}
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button
              title="Edit Book"
              variant="primary"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <>
              <Button title="Update" variant="primary" onClick={handleSave} />
              <Button
                title="Cancel"
                variant="secondary"
                onClick={handleCancel}
              />
            </>
          )}
          {!isEditing && (
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Published Year"
              name="published_year"
              type="number"
              value={formData.published_year}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete Book"
        message="Are you sure you want to delete this book? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
