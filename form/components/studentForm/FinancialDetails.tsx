"use client";

import React, { useEffect, useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const FinancialDetails: React.FC = () => {
  const { register, control, watch, formState: { errors } } = useFormContext<StudentFull>();
  const feeCategory = watch("feeDetail.feeCategory");
  const [showScholarship, setShowScholarship] = useState(false);

  useEffect(() => {
    setShowScholarship(feeCategory === "Scholarship");
  }, [feeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Financial Details</h2>
      </div>

      {/* Fee Category */}
      <div>
        <label className="block font-semibold text-gray-700 mb-2">Fee Category <span className="text-red-500">*</span></label>
        <select
          {...register("feeDetail.feeCategory")}
          className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
            errors.feeDetail?.feeCategory
              ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
          }`}
        >
          <option value="">Select Fee Category</option>
          <option value="Regular">Regular</option>
          <option value="Self-Financed">Self-Financed</option>
          <option value="Scholarship">Scholarship</option>
          <option value="Quota">Quota</option>
        </select>
        {errors.feeDetail?.feeCategory && (
          <p className="text-red-600 text-sm mt-2 font-medium">{errors.feeDetail.feeCategory.message}</p>
        )}
      </div>

      {/* Bank Details - Compulsory */}
      <div className="border-2 border-purple-200 p-6 rounded-xl bg-purple-50">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-5">
          <span className="text-purple-600">🏦</span> Bank Details <span className="text-red-500">*</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Account Holder Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("scholarship.accountHolderName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.scholarship?.accountHolderName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Full name"
            />
            {errors.scholarship?.accountHolderName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.accountHolderName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Bank Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("scholarship.bankName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.scholarship?.bankName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Bank name"
            />
            {errors.scholarship?.bankName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.bankName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Account Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("scholarship.accountNumber")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.scholarship?.accountNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Account number"
            />
            {errors.scholarship?.accountNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.accountNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Branch</label>
            <input
              type="text"
              {...register("scholarship.branch")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="Branch name"
            />
          </div>
        </div>
      </div>

      {/* Scholarship Details - Optional, appears only if Scholarship is selected */}
      {showScholarship && (
        <div className="border-2 border-blue-200 p-6 rounded-xl bg-blue-50">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-5">
            <span className="text-blue-600">💰</span> Scholarship Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Scholarship Type <span className="text-red-500">*</span></label>
              <select
                {...register("scholarship.scholarshipType")}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                  errors.scholarship?.scholarshipType
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              >
                <option value="">Select Type</option>
                <option value="Government">Government</option>
                <option value="Institutional">Institutional</option>
                <option value="Private">Private</option>
                <option value="Other">Other</option>
              </select>
              {errors.scholarship?.scholarshipType && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.scholarshipType.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Scholarship Provider Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                {...register("scholarship.providerName")}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  errors.scholarship?.providerName
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
                placeholder="Organization name"
              />
              {errors.scholarship?.providerName && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.providerName.message}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">Scholarship Amount <span className="text-red-500">*</span></label>
              <input
                type="number"
                {...register("scholarship.amount")}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                  errors.scholarship?.amount
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
                placeholder="Scholarship amount"
              />
              {errors.scholarship?.amount && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarship.amount.message}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDetails;
