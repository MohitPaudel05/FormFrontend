"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const CitizenshipSection: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Citizenship Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Citizenship Number</label>
          <input
            type="text"
            {...register("citizenship.citizenshipNumber")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="Enter Citizenship Number"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue Date</label>
          <input
            type="date"
            {...register("citizenship.citizenshipIssueDate")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue District</label>
          <input
            type="text"
            {...register("citizenship.citizenshipIssueDistrict")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="Enter Issue District"
          />
        </div>
      </div>

    </div>
  );
};

export default CitizenshipSection;
