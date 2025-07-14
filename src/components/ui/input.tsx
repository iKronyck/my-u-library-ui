import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type,
  ...props
}: InputProps) {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-500 mb-2"
        htmlFor={props.id}
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-md focus:placeholder:text-primary shadow-sm disabled:bg-gray-100 disabled:text-gray-500"
        type={type}
        {...props}
      />
    </div>
  );
}
