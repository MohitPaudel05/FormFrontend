"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { StudentFull } from "../../types/student";

const annualIncomeOptions = [
  { value: "LessThan5Lakh", label: "<5 Lakh" },
  { value: "From5To10Lakh", label: "5-10 Lakh" },
  { value: "From10To20Lakh", label: "10-20 Lakh" },
  { value: "MoreThan20Lakh", label: ">20 Lakh" },
];

const ParentGuardianSection: React.FC = () => {
  const { register, control, formState: { errors } } = useFormContext<StudentFull>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "parents",
  });

  // Check if Guardian already exists
  const hasGuardian = fields.some(f => f.parentType === "Guardian");
  const guardianIndex = fields.findIndex(f => f.parentType === "Guardian");

  // Get indices by parent type for reliable rendering
  const fatherIndex = fields.findIndex(f => f.parentType === "Father");
  const motherIndex = fields.findIndex(f => f.parentType === "Mother");

  // Initialize on component mount
  React.useEffect(() => {
    // Check if Father and Mother already exist
    const hasFather = fields.some(f => f.parentType === "Father");
    const hasMother = fields.some(f => f.parentType === "Mother");
    
    if (!hasFather) {
      append({ parentType: "Father", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "", annualFamilyIncome: "" });
    }
    if (!hasMother) {
      append({ parentType: "Mother", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "", annualFamilyIncome: "" });
    }
  }, []);

  const renderParentSection = (index: number, relation: string, emoji: string) => {
    if (index === -1 || !fields[index]) return null;

    return (
      <div key={fields[index]?.id} className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-purple-300 transition-all duration-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
          {emoji} {relation}'s Details
        </h3>

        {/* Hidden field to store parentType */}
        <input type="hidden" {...register(`parents.${index}.parentType`)} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Full Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder={`Enter ${relation}'s full name`}
              {...register(`parents.${index}.fullName`)}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.parents?.[index]?.fullName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400"
              }`}
            />
            {errors.parents?.[index]?.fullName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.fullName?.message}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Mobile Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register(`parents.${index}.mobileNumber`)} 
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.parents?.[index]?.mobileNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400"
              }`}
              placeholder="98XXXXXXXXX"
            />
            {errors.parents?.[index]?.mobileNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.mobileNumber?.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Email</label>
            <input 
              type="email" 
              {...register(`parents.${index}.email`)} 
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.parents?.[index]?.email
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400"
              }`}
              placeholder="email@example.com"
            />
            {errors.parents?.[index]?.email && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.email?.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {/* Occupation */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Occupation</label>
            <input 
              type="text" 
              {...register(`parents.${index}.occupation`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400 transition-all duration-200"
              placeholder="e.g., Teacher, Engineer"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Designation</label>
            <input 
              type="text" 
              {...register(`parents.${index}.designation`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400 transition-all duration-200"
              placeholder="e.g., Senior Manager"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Organization</label>
            <input 
              type="text" 
              {...register(`parents.${index}.organization`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400 transition-all duration-200"
              placeholder="Company/Institution name"
            />
          </div>
        </div>

        {/* Annual Family Income */}
        <div className="mt-5 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <label className="block font-semibold text-gray-700 mb-2">Annual Family Income</label>
          <select 
            {...register(`parents.${index}.annualFamilyIncome`)} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Income Range</option>
            {annualIncomeOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Parent / Guardian Details</h2>
      </div>

      <div className="space-y-5">
        {/* Father Section */}
        {fatherIndex !== -1 && renderParentSection(fatherIndex, "Father", "👨")}

        {/* Mother Section */}
        {motherIndex !== -1 && renderParentSection(motherIndex, "Mother", "👩")}

        {/* Add Guardian Button - Only show if Guardian doesn't exist */}
        {!hasGuardian && (
          <button
            type="button"
            onClick={() => append({ parentType: "Guardian", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "", annualFamilyIncome: "" })}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            + Add Guardian
          </button>
        )}

        {/* Guardian's Details - Only if added */}
        {hasGuardian && guardianIndex !== -1 && (
          <div>
            {renderParentSection(guardianIndex, "Guardian", "👤")}
            <button
              type="button"
              onClick={() => remove(guardianIndex)}
              className="w-full mt-3 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">−</span> Remove Guardian
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentGuardianSection;