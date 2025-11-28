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
          <label className="block font-semibold text-gray-700 mb-2">Citizenship Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("citizenshipInfo.citizenshipNumber")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.citizenshipInfo?.citizenshipNumber
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="Enter Citizenship Number"
          />
          {errors.citizenshipInfo?.citizenshipNumber && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.citizenshipInfo.citizenshipNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            {...register("citizenshipInfo.issueDate")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.citizenshipInfo?.issueDate
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          />
          {errors.citizenshipInfo?.issueDate && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.citizenshipInfo.issueDate.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue District <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("citizenshipInfo.issueDistrict")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.citizenshipInfo?.issueDistrict
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="Enter Issue District"
          />
          {errors.citizenshipInfo?.issueDistrict && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.citizenshipInfo.issueDistrict.message}</p>
          )}
        </div>
      </div>

      {/* Citizenship Photo Upload */}
      <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
        <h3 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
          <span className="text-blue-600">🖼️</span> Citizenship Photo
        </h3>
        
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Citizenship Photo <span className="text-red-500">*</span></label>
          <Controller
            control={control}
            name="citizenshipInfo.citizenshipPhoto"
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                  errors.citizenshipInfo?.citizenshipPhoto
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              />
            )}
          />
          <p className="text-gray-600 text-sm mt-2">Supported formats: JPG, JPEG, PNG (Max 5MB)</p>
          {errors.citizenshipInfo?.citizenshipPhoto && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.citizenshipInfo.citizenshipPhoto.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenshipSection;
