"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { StudentFull } from "../../types/student";

const annualIncomeOptions = ["<5 Lakh", "5-10 Lakh", "10-20 Lakh", ">20 Lakh"];

const ParentGuardianSection: React.FC = () => {
  const { register, control, watch, formState: { errors } } = useFormContext<StudentFull>();

  const { fields, append } = useFieldArray({
    control,
    name: "parents",
  });

  // Ensure Father & Mother always exist
  React.useEffect(() => {
    const relations = fields.map(f => f.relation);
    if (!relations.includes("Father")) {
      append({ relation: "Father", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "" });
    }
    if (!relations.includes("Mother")) {
      append({ relation: "Mother", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "" });
    }
  }, []);

  // Show Guardian section only if emergency contact is Guardian
  const emergencyContactRelation = watch("emergencyContacts")?.[0]?.emergencyContactRelation;
  const hasGuardian = fields.some(f => f.relation === "Guardian");

  React.useEffect(() => {
    if (emergencyContactRelation === "Guardian" && !hasGuardian) {
      append({ relation: "Guardian", fullName: "", mobileNumber: "", occupation: "", designation: "", organization: "", email: "", annualFamilyIncome: undefined });
    }
  }, [emergencyContactRelation, hasGuardian, append]);

  // Separate Father, Mother, and Guardian
  const fatherIndex = fields.findIndex(f => f.relation === "Father");
  const motherIndex = fields.findIndex(f => f.relation === "Mother");
  const guardianIndex = fields.findIndex(f => f.relation === "Guardian");

  const renderParentSection = (index: number, relation: string, emoji: string, showIncome: boolean = false) => {
    if (index === -1) return null;
    const field = fields[index];

    return (
      <div key={field.id} className={`p-6 rounded-xl border-2 transition-all duration-200 ${showIncome ? "border-cyan-300 bg-cyan-50 hover:border-cyan-400 hover:shadow-lg" : "border-gray-200 bg-white hover:border-cyan-200 hover:shadow-lg"}`}>
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 pb-4 border-b-2 border-gray-200">
          <span className="text-3xl">{emoji}</span> {relation}'s Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
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
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="98XXXXXXXXX"
            />
            {errors.parents?.[index]?.mobileNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.mobileNumber?.message}</p>
            )}
          </div>

          {/* Occupation */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Occupation</label>
            <input 
              type="text" 
              {...register(`parents.${index}.occupation`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="e.g., Teacher, Engineer, Farmer"
            />
          </div>

          {/* Designation */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Designation</label>
            <input 
              type="text" 
              {...register(`parents.${index}.designation`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="e.g., Senior Manager, Head Teacher"
            />
          </div>

          {/* Organization */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Organization</label>
            <input 
              type="text" 
              {...register(`parents.${index}.organization`)} 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="Company/Institution/Business name"
            />
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
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="email@example.com"
            />
            {errors.parents?.[index]?.email && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.email?.message}</p>
            )}
          </div>

          {/* Annual Family Income - Only for Guardian */}
          {showIncome && (
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Annual Family Income <span className="text-red-500">*</span></label>
              <select 
                {...register(`parents.${index}.annualFamilyIncome`)} 
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              >
                <option value="">Select Income Range</option>
                {annualIncomeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errors.parents?.[index]?.annualFamilyIncome && (
                <p className="text-red-600 text-sm mt-2 font-medium">{errors.parents[index]?.annualFamilyIncome?.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Parent / Guardian Details</h2>
      </div>

      {/* Father's Details */}
      {renderParentSection(fatherIndex, "Father", "👨", false)}

      {/* Mother's Details */}
      {renderParentSection(motherIndex, "Mother", "👩", false)}

      {/* Annual Family Income Section */}
      <div className="p-6 rounded-xl border-2 border-emerald-200 bg-emerald-50 hover:border-emerald-400 transition-all duration-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          💰 Annual Family Income <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <select 
            {...register("parents.0.annualFamilyIncome")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Income Range</option>
            {annualIncomeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Guardian's Details - Only if selected as emergency contact */}
      {guardianIndex !== -1 && (
        <div className="pt-6 border-t-2 border-gray-200 mt-6">
          <p className="text-sm text-gray-600 mb-4 italic flex items-center gap-2">
            📌 <span>Guardian information is required as you selected Guardian as emergency contact</span>
          </p>
          {renderParentSection(guardianIndex, "Legal Guardian", "👤", false)}
        </div>
      )}
    </div>
  );
};

export default ParentGuardianSection;
