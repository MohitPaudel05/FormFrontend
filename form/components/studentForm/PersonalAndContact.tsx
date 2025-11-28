"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

type Props = {};

const PersonalAndContact: React.FC<Props> = () => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<StudentFull>();

  const disabilityType = watch("disability.disabilityType");

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
              {...register("personalDetail.firstName")}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.personalDetail?.firstName
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="First name"
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
              placeholder="Middle name"
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
              placeholder="Last name"
            />
            {errors.personalDetail?.lastName && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.lastName.message}</p>
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
          {errors.personalDetail?.nationality && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.nationality.message}</p>
          )}
        </div>
      </div>

      {/* --- Demographics & Additional Info --- */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Demographics</h3>
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
            {errors.personalDetail?.gender && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.personalDetail.gender.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Blood Group</label>
            <select {...register("personalDetail.bloodGroup")} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200">
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
              {["Single", "Married", "Divorced"].map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- Religion & Ethnicity --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Religion</label>
          <select
            {...register("personalDetail.religion")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Religion</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Christian">Christian</option>
            <option value="Muslim">Muslim</option>
            <option value="Sikh">Sikh</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Ethnicity/Caste</label>
          <select
            {...register("personalDetail.ethnicity")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Ethnicity</option>
            <option value="Brahmin">Brahmin</option>
            <option value="Chhetri">Chhetri</option>
            <option value="Newari">Newari</option>
            <option value="Magar">Magar</option>
            <option value="Thakuri">Thakuri</option>
            <option value="Limbu">Limbu</option>
            <option value="Rai">Rai</option>
            <option value="Gurung">Gurung</option>
            <option value="Dalit">Dalit</option>
            <option value="Other">Other</option>
          </select>
        </div>
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
              <option value="None">None</option>
              <option value="Physical">Physical</option>
              <option value="Visual">Visual</option>
              <option value="Hearing">Hearing</option>
              <option value="Intellectual">Intellectual</option>
              <option value="Multiple">Multiple</option>
            </select>
          </div>

          {disabilityType && disabilityType !== "None" && (
            <>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  {...register("disability.description")}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="Describe your disability"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Disability Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  {...register("disability.percentage")}
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
