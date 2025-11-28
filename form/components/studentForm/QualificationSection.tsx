"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const QualificationSection: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<StudentFull>();
  const [expandedQualifications, setExpandedQualifications] = useState<number[]>([0]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const toggleQualification = (index: number) => {
    setExpandedQualifications((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleAddQualification = () => {
    const newIndex = fields.length;
    append({ qualificationName: "", boardOrUniversity: "", institutionName: "", passedYear: "", divisionOrGPA: "", marksheetDocument: undefined });
    setExpandedQualifications((prev) => [...prev, newIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Previous Academic Qualifications</h2>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="border-2 border-yellow-200 rounded-xl overflow-hidden bg-white hover:border-yellow-300 transition-all duration-200">
            {/* Collapsible Header */}
            <button
              type="button"
              onClick={() => toggleQualification(index)}
              className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200 transition-all duration-200 border-b-2 border-yellow-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span>📚</span> Qualification {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(index);
                      setExpandedQualifications((prev) => prev.filter((i) => i !== index));
                    }}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg text-sm transition-all duration-200"
                  >
                    ✕ Remove
                  </button>
                )}
                <span className="text-xl text-gray-600 font-bold">
                  {expandedQualifications.includes(index) ? "▼" : "▶"}
                </span>
              </div>
            </button>

            {/* Collapsible Content */}
            {expandedQualifications.includes(index) && (
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Qualification Name <span className="text-red-500">*</span></label>
                    <select
                      {...register(`qualifications.${index}.qualificationName`)}
                      className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                        errors.qualifications?.[index]?.qualificationName
                          ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                          : "border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400"
                      }`}
                    >
                      <option value="">Select Qualification</option>
                      <option value="SLC">SLC (School Leaving Certificate)</option>
                      <option value="+2">+2 (Higher Secondary)</option>
                      <option value="Diploma">Diploma</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="PHD">PHD</option>
                      <option value="Certificate">Certificate</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.qualifications?.[index]?.qualificationName && (
                      <p className="text-red-600 text-sm mt-2 font-medium">
                        {errors.qualifications[index]?.qualificationName?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Board / University</label>
                    <input
                      type="text"
                      {...register(`qualifications.${index}.boardOrUniversity`)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200"
                      placeholder="Board/University name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Institution Name</label>
                    <input
                      type="text"
                      {...register(`qualifications.${index}.institutionName`)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200"
                      placeholder="School/College name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Passed Year</label>
                    <input
                      type="text"
                      {...register(`qualifications.${index}.passedYear`)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200"
                      placeholder="e.g., 2020"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Division / GPA</label>
                    <input
                      type="text"
                      {...register(`qualifications.${index}.divisionOrGPA`)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 hover:border-gray-400 transition-all duration-200"
                      placeholder="e.g., 3.8/4.0"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">Marksheet Document</label>
                    <Controller
                      control={control}
                      name={`qualifications.${index}.marksheetDocument`}
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
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQualification}
          className="w-full py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-700 hover:to-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
        >
          <span className="text-lg">+</span> Add Another Qualification
        </button>
      </div>
    </div>
  );
};

export default QualificationSection;
