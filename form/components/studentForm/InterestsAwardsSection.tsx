"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";
import { interestOptions } from "../../constants/enums";

type Props = {
  fullStudentData?: any;
};

const InterestsAwardsSection: React.FC<Props> = ({ fullStudentData }) => {
  const { control, register, setValue: formSetValue, watch, getValues, formState: { errors } } = useFormContext<StudentFull>();
  const [showOtherInterest, setShowOtherInterest] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(true);
  const extracurricularInterests = watch("studentExtraInfos.extracurricularInterests") || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "achievements",
  });

  const hasInitialized = React.useRef(false);

  // Ensure at least one award exists
  React.useEffect(() => {
    if (!hasInitialized.current && fields.length === 0 && !fullStudentData?.achievements) {
      hasInitialized.current = true;
      append({ title: "", issuingOrganization: "", yearReceived: "" });
    }
  }, []);

  // Sync extracurricular interests when fullStudentData changes
  React.useEffect(() => {
    if (fullStudentData?.studentExtraInfos?.extracurricularInterests) {
      formSetValue("studentExtraInfos.extracurricularInterests", fullStudentData.studentExtraInfos.extracurricularInterests);
    }
  }, [fullStudentData, formSetValue]);

  // Show all items if data exists, otherwise show only first item unless user clicks "Show More"
  const visibleFields = fullStudentData?.achievements?.length > 0 ? fields : (showAllAchievements ? fields : fields.slice(0, 1));

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
          {interestOptions.map((interest) => {
            // Use both watched value and fullStudentData for fallback
            const watchedInterests = extracurricularInterests || [];
            const fallbackInterests = fullStudentData?.studentExtraInfos?.extracurricularInterests || [];
            const interestsToCheck = watchedInterests.length > 0 ? watchedInterests : fallbackInterests;
            const isChecked = interestsToCheck.includes(interest);
            return (
            <label
              key={interest}
              className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-fuchsia-400 hover:bg-fuchsia-50 transition-all duration-200 cursor-pointer"
            >
              <input
                type="checkbox"
                value={interest}
                checked={isChecked}
                onChange={(e) => {
                  const currentInterests = extracurricularInterests || [];
                  let updatedInterests;
                  if (e.target.checked) {
                    updatedInterests = [...currentInterests, interest];
                  } else {
                    updatedInterests = currentInterests.filter(i => i !== interest);
                  }
                  formSetValue("studentExtraInfos.extracurricularInterests", updatedInterests);
                  if (interest === "Other") setShowOtherInterest(e.target.checked);
                }}
                className="w-4 h-4 accent-fuchsia-600 rounded cursor-pointer"
              />
              <span className="font-medium text-gray-700">{interest}</span>
            </label>
            );
          })}
        </div>
        {showOtherInterest && (
          <div>
            <input
              type="text"
              placeholder="Please specify other interest"
              {...register("studentExtraInfos.otherInterest")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
            />
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-12 bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 rounded"></div>
          <h2 className="text-3xl font-bold text-gray-900">Previous Achievements</h2>
        </div>

        <div className="space-y-3">
          {visibleFields.map((field, index) => (
            <div key={field.id} className="border-2 border-fuchsia-200 rounded-xl p-6 bg-white hover:border-fuchsia-300 transition-all duration-200">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-fuchsia-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span>🏆</span> Achievement {index + 1} {index === 0 && <span className="text-red-500 text-sm">*</span>}
                </h3>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      remove(index);
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all duration-200"
                  >
                    ✕ Remove
                  </button>
                )}
              </div>

              {/* Card Content - Always Visible */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register(`achievements.${index}.title` as const)}
                      className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                        errors.achievements?.[index]?.title
                          ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          : "border-gray-300 bg-white focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400"
                      }`}
                      placeholder="Achievement title"
                    />
                    {errors.achievements?.[index]?.title && (
                      <p className="text-red-600 text-sm mt-2 font-medium">{errors.achievements[index]?.title?.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Issuing Organization</label>
                    <input
                      type="text"
                      {...register(`achievements.${index}.issuingOrganization` as const)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
                      placeholder="Organization name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Year Received</label>
                  <input
                    type="number"
                    {...register(`achievements.${index}.yearReceived` as const)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-fuchsia-200 focus:border-fuchsia-500 hover:border-gray-400 transition-all duration-200"
                    placeholder="Year"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Show More / Show Less Button */}
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => setShowAllAchievements(!showAllAchievements)}
              className="w-full py-2 text-fuchsia-600 hover:text-fuchsia-700 font-semibold text-sm transition-all duration-200"
            >
              {showAllAchievements ? '▲ Show Less' : '▼ Show More (' + (fields.length - 1) + ' more)'}
            </button>
          )}

          {/* Add More Button */}
          <button
            type="button"
            onClick={() => append({ title: "", issuingOrganization: "", yearReceived: "" })}
            className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-fuchsia-500 hover:from-fuchsia-700 hover:to-fuchsia-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <span className="text-lg">+</span> Add More Achievement
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterestsAwardsSection;

