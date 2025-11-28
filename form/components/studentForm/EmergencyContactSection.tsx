"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { StudentFull } from "../../types/student";

const EmergencyContactSection: React.FC = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<StudentFull>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emergencyContacts",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-red-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Emergency Contacts</h2>
      </div>

      <div className="space-y-5">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border-2 border-gray-200 rounded-xl bg-white hover:border-blue-300 transition-all duration-200">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-gray-800">Emergency Contact {index + 1}</h3>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-3 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Contact Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  {...register(`emergencyContacts.${index}.emergencyContactName`)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.emergencyContacts?.[index]?.emergencyContactName
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                  }`}
                  placeholder="Full name"
                />
                {errors.emergencyContacts?.[index]?.emergencyContactName && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.emergencyContacts[index]?.emergencyContactName?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Relation <span className="text-red-500">*</span></label>
                <select
                  {...register(`emergencyContacts.${index}.emergencyContactRelation`)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Contact Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  {...register(`emergencyContacts.${index}.emergencyContactNumber`)}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                    errors.emergencyContacts?.[index]?.emergencyContactNumber
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                  }`}
                  placeholder="Phone number"
                />
                {errors.emergencyContacts?.[index]?.emergencyContactNumber && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.emergencyContacts[index]?.emergencyContactNumber?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  {...register(`emergencyContacts.${index}.emergencyContactEmail`)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          append({
            emergencyContactName: "",
            emergencyContactRelation: "Father",
            emergencyContactNumber: "",
          })
        }
        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
      >
        + Add Emergency Contact
      </button>
    </div>
  );
};

export default EmergencyContactSection;
