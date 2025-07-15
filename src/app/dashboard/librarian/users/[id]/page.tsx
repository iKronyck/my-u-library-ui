"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetUser, usePutUser, useDeleteUser } from "@/hooks/users";
import { useState } from "react";
import { Button, Input, Modal } from "@/components/ui";

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.id as string;

  const { data: user, isLoading, error } = useGetUser(userId);
  const { mutate: putUser } = usePutUser(userId);
  const { mutate: deleteUser } = useDeleteUser(userId);

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "student" as "student" | "librarian",
    is_active: true,
  });

  if (user && !formData.first_name) {
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    putUser({
      first_name: formData.first_name,
      last_name: formData.last_name,
      is_active: formData.is_active,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        is_active: user.is_active,
      });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteUser();
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/librarian/users"
            className="text-primary hover:text-primary/80 mb-4 inline-block"
          >
            ← Back to users
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-600">
            {isEditing ? "Editing user" : "User details"}
          </p>
        </div>
        <div className="flex space-x-3">
          {!isEditing ? (
            <Button
              title="Edit User"
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
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={true}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleSelectChange}
                disabled={true}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
              >
                <option value="student">Student</option>
                <option value="librarian">Librarian</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Active User
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date Joined
              </label>
              <p className="text-sm text-gray-500">
                {new Date(user.date_joined).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
