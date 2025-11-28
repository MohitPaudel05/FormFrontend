"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const DocumentUploadSection: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Document Uploads</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Provisional / Admit Card */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">📄 Provisional / Admit Card</label>
          <Controller
            control={control}
            name="documents.0.file"
            render={({ field }) => (
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
                  errors.documents?.[0]?.file
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              />
            )}
          />
          {errors.documents?.[0]?.file && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.documents[0]?.file?.message}</p>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">🖼️ Photo (Passport Size, JPG/PNG, Max 2MB)</label>
          <Controller
            control={control}
            name="documents.1.file"
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 ${
                  errors.documents?.[1]?.file
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              />
            )}
          />
          {errors.documents?.[1]?.file && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.documents[1]?.file?.message}</p>
          )}
        </div>

        {/* Signature Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">✍️ Signature (JPG/PNG, Max 1MB)</label>
          <Controller
            control={control}
            name="documents.2.file"
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 ${
                  errors.documents?.[2]?.file
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              />
            )}
          />
          {errors.documents?.[2]?.file && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.documents[2]?.file?.message}</p>
          )}
        </div>

        {/* Character Certificate Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">🏅 Character Certificate (PDF, Max 2MB)</label>
          <Controller
            control={control}
            name="documents.3.file"
            render={({ field }) => (
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => field.onChange(e.target.files?.[0])}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 ${
                  errors.documents?.[3]?.file
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              />
            )}
          />
          {errors.documents?.[3]?.file && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.documents[3]?.file?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadSection;
