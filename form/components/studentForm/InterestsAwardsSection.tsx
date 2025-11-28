"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const interestsList = [
  "Sports",
  "Music",
  "Debate",
  "Coding",
  "Volunteering",
  "Arts",
  "Other",
];

const InterestsAwardsSection: React.FC = () => {
  const { control, register, watch, formState: { errors } } = useFormContext<StudentFull>();
  const [showOtherInterest, setShowOtherInterest] = useState(false);
  const selectedInterests = watch("interests")?.map(i => i.interest) || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "awards",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Extracurricular & Achievements</h2>
      </div>

      {/* Interests Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🎯 Extracurricular Interests
        </h3>
        <div className="flex flex-wrap gap-3">
          {interestsList.map((interest) => (
            <label
              key={interest}
              className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-fuchsia-400 hover:bg-fuchsia-50 transition-all duration-200 cursor-pointer"
            >
              <input
                type="checkbox"
                value={interest}
                {...register(`interests.${interest}.interest` as any)}
                onChange={(e) => {
                  if (e.target.value === "Other") setShowOtherInterest(e.target.checked);
                }}
                className="w-4 h-4 accent-fuchsia-600 rounded cursor-pointer"
              />
              <span className="font-medium text-gray-700">{interest}</span>
            </label>
          ))}
        </div>
        {showOtherInterest && (
          <div>
            <input
              type="text"
              placeholder="Please specify other interest"
              {...register("interests.0.otherDetail")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
            />
          </div>
        )}
      </div>

      {/* Awards Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🏆 Previous Achievements / Awards
        </h3>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border-2 border-fuchsia-200 p-6 rounded-xl bg-fuchsia-50 hover:border-fuchsia-400 transition-all duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register(`awards.${index}.title` as const)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.awards?.[index]?.title
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400"
                    }`}
                    placeholder="Award title"
                  />
                  {errors.awards?.[index]?.title && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{errors.awards[index]?.title?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Issuing Organization</label>
                  <input
                    type="text"
                    {...register(`awards.${index}.issuingOrganization` as const)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
                    placeholder="Organization name"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Year Received</label>
                  <input
                    type="number"
                    {...register(`awards.${index}.yearReceived` as const)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
                    placeholder="Year"
                  />
                </div>
              </div>

              <button
                type="button"
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
                onClick={() => remove(index)}
              >
                ✕ Remove Award
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="w-full px-4 py-3 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-700 hover:to-fuchsia-600 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg"
          onClick={() => append({ title: "", issuingOrganization: "", yearReceived: "" })}
        >
          + Add Another Award
        </button>
      </div>
    </div>
  );
};

export default InterestsAwardsSection;
