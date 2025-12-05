"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";
import { 
  genderOptions, 
  bloodGroupOptions, 
  maritalStatusOptions, 
  religionOptions, 
  ethnicityOptions,
  ethnicityGroupOptions,
  ethnicityByGroup,
  disabilityOptions 
} from "../../constants/enums";

type Props = {};

const PersonalAndContact: React.FC<Props> = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<StudentFull>();

  const disabilityType = watch("disability.disabilityType");
  const selectedEthnicityGroup = watch("ethnicity.ethnicityGroup");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Personal & Biometric Details</h2>
      </div>

      {/* --- Profile Picture --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Profile Picture</label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            {...register("student.image")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
      </div>

      {/* --- Name Fields --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">👤 Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("student.firstName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.student?.firstName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="First name"
            />
            {errors.student?.firstName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.student.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Middle Name</label>
            <input
              type="text"
              {...register("student.middleName")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
              placeholder="Middle name"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Last Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("student.lastName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.student?.lastName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="Last name"
            />
            {errors.student?.lastName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.student.lastName.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Date of Birth / Place / Nationality --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Date of Birth <span className="text-red-500">*</span></label>
          <input
            type="date"
            {...register("student.dateOfBirth")}
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.student?.dateOfBirth
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          />
          {errors.student?.dateOfBirth && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.student.dateOfBirth.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Place of Birth</label>
          <input
            type="text"
            {...register("student.placeOfBirth")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="City/District"
          />
        </div>


      </div>

      {/* --- Demographics & Additional Info --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Demographics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Gender <span className="text-red-500">*</span></label>
            <select 
              {...register("student.gender")} 
              className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                errors.student?.gender
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Gender</option>
              {genderOptions.map((gender) => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
            {errors.student?.gender && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.student.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Blood Group</label>
            <select {...register("secondaryInfo.bloodGroup")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200">
              <option value="">Select Blood Group</option>
              {bloodGroupOptions.map((bg) => (
                <option key={bg.value} value={bg.value}>{bg.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Marital Status</label>
            <select
              {...register("secondaryInfo.maritalStatus")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            >
              <option value="">Select Status</option>
              {maritalStatusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- Religion & Ethnicity --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">🌍 Religion & Ethnicity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Religion</label>
            <select
              {...register("secondaryInfo.religion")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            >
              <option value="">Select Religion</option>
              {religionOptions.map((religion) => (
                <option key={religion} value={religion}>{religion}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Ethnicity Group</label>
            <select
              {...register("ethnicity.ethnicityGroup")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            >
              <option value="">Select Ethnicity Group</option>
              {ethnicityGroupOptions.map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- Ethnicity/Caste based on group --- */}
        {selectedEthnicityGroup && (
          <div className="mt-5">
            <label className="block font-semibold text-gray-700 mb-2">Ethnicity/Caste</label>
            <select
              {...register("ethnicity.ethnicityName")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            >
              <option value="">Select Ethnicity</option>
              {(ethnicityByGroup[selectedEthnicityGroup] || []).map((ethnicity) => (
                <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* --- Disability Information --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span>♿</span> Disability Type
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Disability Type</label>
            <select
              {...register("disability.disabilityType")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            >
              {disabilityOptions.map((disability) => (
                <option key={disability} value={disability}>{disability}</option>
              ))}
            </select>
          </div>

          {disabilityType && disabilityType !== "None" && (
            <>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Disability Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register("disability.disabilityPercentage", { valueAsNumber: true })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="e.g., 50"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalAndContact;
