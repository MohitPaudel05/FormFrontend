"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const BankDetailsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-pink-600 to-pink-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Bank Details <span className="text-sm font-normal text-gray-500">(Optional)</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Account Holder Name</label>
          <input
            type="text"
            {...register("bankDetail.accountHolderName")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="Full name on account"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Bank Name</label>
          <input
            type="text"
            {...register("bankDetail.bankName")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., Nepal Bank Limited"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Account Number</label>
          <input
            type="text"
            {...register("bankDetail.accountNumber")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., 0123456789"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Branch</label>
          <input
            type="text"
            {...register("bankDetail.branch")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., Kathmandu"
          />
        </div>
      </div>
    </div>
  );
};

export default BankDetailsSection;
