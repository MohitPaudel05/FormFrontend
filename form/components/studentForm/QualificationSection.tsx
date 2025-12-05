"use client";

import React from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const divisionGPAOptions = ["First", "Second", "Third", "GPA", "Other"];
const qualificationOptions = [
  { value: "SLC", label: "SLC/SEE" },
  { value: "Plus", label: "+2" },
  { value: "Bachelors", label: "Bachelors" },
  { value: "Masters", label: "Masters" },
];

const QualificationSection: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<StudentFull>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "academicHistories",
  });

  React.useEffect(() => {
    // Ensure at least one qualification exists
    if (fields.length === 0) {
      append({ 
        qualification: "SLC", 
        board: "", 
        institution: "", 
        passedYear: "", 
        divisionGPA: "First", 
        marksheet: undefined,
        provisional: undefined
      });
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Previous Academic Qualifications</h2>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="border-2 border-yellow-200 rounded-xl p-6 bg-white hover:border-yellow-300 transition-all duration-200">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-yellow-100">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <span>📚</span> Qualification {index + 1}
              </h3>
              {fields.length > 1 && (
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
                  <label className="block font-semibold text-gray-700 mb-2">Qualification <span className="text-red-500">*</span></label>
                  <select
                    {...register(`academicHistories.${index}.qualification`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.qualification
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select Qualification</option>
                    {qualificationOptions.map((qual) => (
                      <option key={qual.value} value={qual.value}>{qual.label}</option>
                    ))}
                  </select>
                  {errors.academicHistories?.[index]?.qualification && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.qualification?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Board <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.board`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.board
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="Board/University name"
                  />
                  {errors.academicHistories?.[index]?.board && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.board?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Institution <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.institution`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.institution
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="School/College name"
                  />
                  {errors.academicHistories?.[index]?.institution && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.institution?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Passed Year <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    {...register(`academicHistories.${index}.passedYear`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.passedYear
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 bg-white focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                    placeholder="e.g., 2020"
                  />
                  {errors.academicHistories?.[index]?.passedYear && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.passedYear?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Division / GPA <span className="text-red-500">*</span></label>
                  <select
                    {...register(`academicHistories.${index}.divisionGPA`)}
                    className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                      errors.academicHistories?.[index]?.divisionGPA
                        ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                        : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                    }`}
                  >
                    <option value="">Select Division/GPA</option>
                    {divisionGPAOptions.map((division) => (
                      <option key={division} value={division}>{division}</option>
                    ))}
                  </select>
                  {errors.academicHistories?.[index]?.divisionGPA && (
                    <p className="text-red-600 text-sm mt-2 font-medium">
                      {errors.academicHistories[index]?.divisionGPA?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Marksheet Document</label>
                  <Controller
                    control={control}
                    name={`academicHistories.${index}.marksheet`}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Provisional Document</label>
                  <Controller
                    control={control}
                    name={`academicHistories.${index}.provisional`}
                    render={({ field }) => (
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            append({ 
              qualification: "SLC", 
              board: "", 
              institution: "", 
              passedYear: "", 
              divisionGPA: "First", 
              marksheet: undefined,
              provisional: undefined
            });
          }}
          className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
        >
          <span className="text-lg">+</span> Add Next Qualification
        </button>
      </div>
    </div>
  );
};

export default QualificationSection;
