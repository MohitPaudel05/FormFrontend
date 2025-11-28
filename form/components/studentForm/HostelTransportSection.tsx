"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const transportOptions = ["Walk", "Bicycle", "Bus", "Private Vehicle"];

const HostelTransportSection: React.FC = () => {
  const { register, watch, formState: { errors } } = useFormContext<StudentFull>();
  const residencyType = watch("hostelTransport.residencyType");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-amber-600 to-amber-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Hostel & Transport Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Residency Type */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Residency Type <span className="text-red-500">*</span></label>
          <select
            {...register("hostelTransport.residencyType")}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
              errors.hostelTransport?.residencyType
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          >
            <option value="">Select Residency Type</option>
            <option value="Hosteller">Hosteller</option>
            <option value="Day Scholar">Day Scholar</option>
          </select>
          {errors.hostelTransport?.residencyType && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.hostelTransport.residencyType.message}</p>
          )}
        </div>

        {/* Transport Method */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Transport Method</label>
          <select
            {...register("hostelTransport.transportMethod")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Transport Method</option>
            {transportOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HostelTransportSection;
