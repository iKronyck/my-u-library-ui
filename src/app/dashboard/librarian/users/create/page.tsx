"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateUser } from "@/hooks/users";
import { Button, Input } from "@/components/ui";

export default function CreateUserPage() {
  const router = useRouter();
  const { mutate: createUser, isPending } = useCreateUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "student" as "student" | "librarian",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    createUser(formData, {
      onSuccess: () => {
        router.push("/dashboard/librarian/users");
      },
      onError: (error: unknown) => {
        if (
          error &&
          typeof error === "object" &&
          "response" in error &&
          error.response &&
          typeof error.response === "object" &&
          "data" in error.response &&
          error.response.data &&
          typeof error.response.data === "object" &&
          "message" in error.response.data
        ) {
          setErrors({ submit: String(error.response.data.message) });
        } else {
          setErrors({ submit: "Failed to create user. Please try again." });
        }
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard/librarian/users"
          className="text-primary hover:text-primary/80 mb-4 inline-block"
        >
          ← Back to users
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
        <p className="text-gray-600">Add a new user to the library system</p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <Input
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>
            <div>
              <Input
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>
            <div>
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className={`w-full p-2 border border-gray-300 rounded-md focus:placeholder:text-primary shadow-sm disabled:bg-gray-100 disabled:text-gray-500 ${
                  errors.role ? "border-red-300" : ""
                }`}
                required
              >
                <option value="student">Student</option>
                <option value="librarian">Librarian</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role}</p>
              )}
            </div>
          </div>

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="mt-6 flex space-x-3">
            <Button
              type="submit"
              title="Create User"
              variant="primary"
              disabled={isPending}
            />
            <Link href="/dashboard/librarian/users">
              <Button
                type="button"
                title="Cancel"
                variant="secondary"
                disabled={isPending}
              />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
