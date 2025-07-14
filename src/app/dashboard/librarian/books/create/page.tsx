"use client";
import Link from "next/link";
import { useState } from "react";
import { Button, Input } from "@/components/ui";
import { usePostBook } from "@/hooks/books/usePostBook";

export default function CreateBookPage() {
  const { mutate: postBook } = usePostBook();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    published_year: "",
    stock_quantity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    postBook({
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      published_year: parseInt(formData.published_year),
      stock_quantity: parseInt(formData.stock_quantity),
    });
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Create Book</h1>
        </div>
        {/*  */}
        <div className="flex space-x-3">
          <Button title="Create Book" variant="primary" onClick={handleSave} />
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
            />
            <Input
              label="Author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
            <Input
              label="Genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
            />
            <Input
              label="Published Year"
              name="published_year"
              type="number"
              value={formData.published_year}
              onChange={handleInputChange}
            />
            <Input
              label="Stock Quantity"
              name="stock_quantity"
              type="number"
              value={formData.stock_quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
