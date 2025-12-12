"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

type Props = {
  fullStudentData?: any;
};

const CitizenshipSection: React.FC<Props> = ({ fullStudentData }) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<StudentFull>();

  // Watch the file inputs to display preview
  const frontPhotoFile = watch("citizenship.citizenshipFrontPhoto");
  const backPhotoFile = watch("citizenship.citizenshipBackPhoto");
  const frontPhotoPath = watch("citizenship.citizenshipFrontPhotoPath");
  const backPhotoPath = watch("citizenship.citizenshipBackPhotoPath");

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
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
              errors.citizenship?.citizenshipNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Citizenship Number"
          />
          {errors.citizenship?.citizenshipNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.citizenship.citizenshipNumber.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue Date</label>
          <input
            type="date"
            {...register("citizenship.citizenshipIssueDate")}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
              errors.citizenship?.citizenshipIssueDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.citizenship?.citizenshipIssueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.citizenship.citizenshipIssueDate.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Issue District</label>
          <input
            type="text"
            {...register("citizenship.citizenshipIssueDistrict")}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${
              errors.citizenship?.citizenshipIssueDistrict ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter Issue District"
          />
          {errors.citizenship?.citizenshipIssueDistrict && (
            <p className="text-red-500 text-sm mt-1">{errors.citizenship.citizenshipIssueDistrict.message}</p>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">📸 Citizenship Photos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Citizenship Front Photo */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Front Photo</label>
            
            {/* Display existing photo if available */}
            {frontPhotoPath && !frontPhotoFile && (
              <div className="mb-3 p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700 font-semibold mb-2">✅ Current Photo:</p>
                <img 
                  src={`https://localhost:7190/${frontPhotoPath}`}
                  alt="Front citizenship photo"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            {/* File input for new photo */}
            <Controller
              control={control}
              name="citizenship.citizenshipFrontPhoto"
              render={({ field }) => (
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                    errors.citizenship?.citizenshipFrontPhoto ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.citizenship?.citizenshipFrontPhoto && (
              <p className="text-red-500 text-sm mt-1">{errors.citizenship.citizenshipFrontPhoto.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">JPG/PNG, Max 2MB {frontPhotoPath && !frontPhotoFile && "(Optional - leave empty to keep current)"}</p>
          </div>

          {/* Citizenship Back Photo */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Back Photo</label>
            
            {/* Display existing photo if available */}
            {backPhotoPath && !backPhotoFile && (
              <div className="mb-3 p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-sm text-green-700 font-semibold mb-2">✅ Current Photo:</p>
                <img 
                  src={`https://localhost:7190/${backPhotoPath}`}
                  alt="Back citizenship photo"
                  className="w-full h-40 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <Controller
              control={control}
              name="citizenship.citizenshipBackPhoto"
              render={({ field }) => (
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ${
                    errors.citizenship?.citizenshipBackPhoto ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.citizenship?.citizenshipBackPhoto && (
              <p className="text-red-500 text-sm mt-1">{errors.citizenship.citizenshipBackPhoto.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">JPG/PNG, Max 2MB {backPhotoPath && !backPhotoFile && "(Optional - leave empty to keep current)"}</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CitizenshipSection;
