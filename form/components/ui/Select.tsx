import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectProps {
  label: string;
  options: { label: string; value: string | number }[];
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const Select: React.FC<SelectProps> = ({ label, options, error, register }) => {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-sm font-medium mb-1">{label}</label>
      <select
        {...register}
        className={`p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default Select;
