import { useEffect, useRef } from "react";
import { Button } from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
}

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: "🗑️",
          confirmButtonClass: "bg-red-600 hover:bg-red-700",
        };
      case "warning":
        return {
          icon: "⚠️",
          confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700",
        };
      case "info":
        return {
          icon: "ℹ️",
          confirmButtonClass: "bg-blue-600 hover:bg-blue-700",
        };
      default:
        return {
          icon: "❓",
          confirmButtonClass: "bg-gray-600 hover:bg-gray-700",
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-90" />
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3">{variantStyles.icon}</span>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex justify-end space-x-3">
          <Button
            title={cancelText}
            variant="secondary"
            onClick={onClose}
            className="min-w-[80px]"
          />
          <Button
            title={confirmText}
            variant="primary"
            onClick={onConfirm}
            className={`min-w-[80px] ${variantStyles.confirmButtonClass}`}
          />
        </div>
      </div>
    </div>
  );
}
