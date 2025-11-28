"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const ContactInfoSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-green-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Contact Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
          <input
            type="email"
            {...register("contactInfo.email")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.contactInfo?.email
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="your.email@example.com"
          />
          {errors.contactInfo?.email && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.contactInfo.email.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Alternate Email</label>
          <input
            type="email"
            {...register("contactInfo.alternateEmail")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="alternate.email@example.com"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Primary Mobile <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("contactInfo.primaryMobile")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.contactInfo?.primaryMobile
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="98XXXXXXXXX"
          />
          {errors.contactInfo?.primaryMobile && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.contactInfo.primaryMobile.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Secondary Mobile</label>
          <input
            type="text"
            {...register("contactInfo.secondaryMobile")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="98XXXXXXXXX"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
