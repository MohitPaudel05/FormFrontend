"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { StudentFull } from "../../types/student";

const PersonalDetailsSection: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StudentFull>();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Personal Details</h2>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("personalDetail.firstName")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.personalDetail?.firstName
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="Enter First Name"
          />
          {errors.personalDetail?.firstName && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Middle Name</label>
          <input
            type="text"
            {...register("personalDetail.middleName")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="Enter Middle Name"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            {...register("personalDetail.lastName")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.personalDetail?.lastName
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="Enter Last Name"
          />
          {errors.personalDetail?.lastName && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Birth & Nationality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
          <input
            type="date"
            {...register("personalDetail.dateOfBirth")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.personalDetail?.dateOfBirth
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          />
          {errors.personalDetail?.dateOfBirth && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Place of Birth</label>
          <input
            type="text"
            {...register("personalDetail.placeOfBirth")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="City/District"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Nationality <span className="text-red-500">*</span></label>
          <select
            {...register("personalDetail.nationality")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="Nepali">Nepali</option>
          </select>
        </div>
      </div>

      {/* Gender, Blood Group & Marital Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
          <select
            {...register("personalDetail.gender")}
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
              errors.personalDetail?.gender
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Blood Group</label>
          <select
            {...register("personalDetail.bloodGroup")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Marital Status</label>
          <select
            {...register("personalDetail.maritalStatus")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Status</option>
            {["Single", "Married", "Divorced"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsSection;
