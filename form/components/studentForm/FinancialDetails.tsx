"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";
import { feeCategoryOptions, scholarshipTypeOptions } from "../../constants/enums";

type Props = {
  fullStudentData?: any;
};

const FinancialDetails: React.FC<Props> = ({ fullStudentData }) => {
  const { register, watch, formState: { errors } } = useFormContext<StudentFull>();
  const feeCategory = watch("scholarships.feeCategory");
  const scholarshipType = watch("scholarships.scholarshipType");
  const [showScholarship, setShowScholarship] = useState(false);

  // Note: Form is reset with all data at the page level, no need to sync here

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
          {...register("scholarships.feeCategory")}
          className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
            errors.scholarships?.feeCategory
              ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
              : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
          }`}
        >
          <option value="">Select Fee Category</option>
          {feeCategoryOptions.map((category) => (
            <option key={category.value} value={category.value}>{category.label}</option>
          ))}
        </select>
        {errors.scholarships?.feeCategory && (
          <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarships.feeCategory.message}</p>
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
              {...register("bankDetails.accountHolderName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.bankDetails?.accountHolderName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Full name"
            />
            {errors.bankDetails?.accountHolderName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.bankDetails.accountHolderName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Bank Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("bankDetails.bankName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.bankDetails?.bankName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Bank name"
            />
            {errors.bankDetails?.bankName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.bankDetails.bankName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Account Number <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("bankDetails.accountNumber")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.bankDetails?.accountNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Account number"
            />
            {errors.bankDetails?.accountNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.bankDetails.accountNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Branch</label>
            <input
              type="text"
              {...register("bankDetails.branch")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="Branch name"
            />
          </div>
        </div>
      </div>

      {/* Scholarship Details - Shows when Scholarship fee category is selected */}
      {showScholarship && (
        <div className="border-2 border-blue-200 p-6 rounded-xl bg-blue-50">
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2 mb-5">
            <span className="text-blue-600">💰</span> Scholarship Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Scholarship Type <span className="text-red-500">*</span></label>
              <select
                {...register("scholarships.scholarshipType")}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                  errors.scholarships?.scholarshipType
                    ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                }`}
              >
                <option value="">Select Type</option>
                {scholarshipTypeOptions.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
              {errors.scholarships?.scholarshipType && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarships.scholarshipType.message}</p>
              )}
            </div>

            {scholarshipType && scholarshipType !== "None" && (
              <>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Scholarship Provider Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register("scholarships.scholarshipProvider")}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.scholarships?.scholarshipProvider
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                    }`}
                    placeholder="Organization name"
                  />
                  {errors.scholarships?.scholarshipProvider && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarships.scholarshipProvider.message}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Scholarship Amount <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    {...register("scholarships.scholarshipAmount")}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.scholarships?.scholarshipAmount
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                    }`}
                    placeholder="Scholarship amount"
                  />
                  {errors.scholarships?.scholarshipAmount && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{errors.scholarships.scholarshipAmount.message}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialDetails;
