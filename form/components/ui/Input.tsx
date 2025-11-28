import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({ label, type = "text", placeholder, error, register, required = false }) => {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`px-4 py-3 border-2 rounded-lg w-full focus:outline-none transition-all duration-200 ${
          error
            ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
            : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
        }`}
      />
      {error && <p className="text-red-600 text-sm mt-2 font-medium">{error.message}</p>}
    </div>
  );
};

export default Input;
