import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CheckboxProps {
  label: string;
  error?: FieldError;
  register?: UseFormRegisterReturn;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, error, register }) => {
  return (
    <div className="flex items-center mb-3">
      <input type="checkbox" {...register} className="mr-2" />
      <label>{label}</label>
      {error && <p className="text-red-500 text-xs ml-2">{error.message}</p>}
    </div>
  );
};

export default Checkbox;
