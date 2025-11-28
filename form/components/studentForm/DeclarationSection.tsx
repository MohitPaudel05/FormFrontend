"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const DeclarationSection: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<StudentFull>();
  
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-violet-600 to-violet-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Declaration</h2>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl space-y-5">
        {/* Declaration Checkbox */}
        <div className="flex items-start space-x-4">
          <input
            type="checkbox"
            id="declaration"
            {...register("declaration.isDeclared")}
            className="w-5 h-5 mt-1 rounded border-2 border-gray-300 focus:ring-2 focus:ring-blue-200 cursor-pointer"
          />
          <label htmlFor="declaration" className="text-gray-700 font-medium leading-relaxed cursor-pointer">
            I hereby declare that all the information provided above is true and correct to the best of my knowledge, and I accept the terms and conditions.
          </label>
        </div>
        {errors.declaration?.isDeclared && (
          <p className="text-red-600 text-sm font-medium">You must accept the declaration to proceed</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Date of Application */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Date of Application</label>
          <input
            type="date"
            {...register("declaration.dateOfApplication")}
            defaultValue={today}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Place */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Place</label>
          <input
            type="text"
            {...register("declaration.place")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="City/Town"
          />
        </div>
      </div>
    </div>
  );
};

export default DeclarationSection;
