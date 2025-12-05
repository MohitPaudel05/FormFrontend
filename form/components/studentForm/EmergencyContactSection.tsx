"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const EmergencyContactSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-red-400 rounded"></div>
        <h2 className="text-3xl font-bold   text-gray-900">Emergency Contact</h2>
      </div>

      <div className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-red-300 transition-all duration-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Contact Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("emergency.emergencyContactName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.emergency?.emergencyContactName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Full name"
            />
            {errors.emergency?.emergencyContactName && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {errors.emergency.emergencyContactName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Relation <span className="text-red-500">*</span></label>
            <select
              {...register("emergency.emergencyContactRelation")}
              className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                errors.emergency?.emergencyContactRelation
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Relation</option>
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Guardian">Guardian</option>
              <option value="Sibling">Sibling</option>
              <option value="Other">Other</option>
            </select>
            {errors.emergency?.emergencyContactRelation && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {errors.emergency.emergencyContactRelation.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("emergency.emergencyContactNumber")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.emergency?.emergencyContactNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Phone number"
            />
            {errors.emergency?.emergencyContactNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">
                {errors.emergency.emergencyContactNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactSection;
