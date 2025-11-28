"use client";

import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { StudentFull } from "../../types/student";

const faculties = ["Science", "Management", "Humanities"];
const programsMap: Record<string, string[]> = {
  Science: ["BSc CSIT", "BSc Microbiology"],
  Management: ["BBA", "BBS"],
  Humanities: ["BA", "B.Ed"],
};
const courseLevels = ["+2", "Bachelor", "Master"];
const academicStatuses = ["Active", "On Hold", "Completed", "Dropped Out"];

const EnrollmentSection: React.FC = () => {
  const { register, control, setValue, formState: { errors } } = useFormContext<StudentFull>();

  const selectedFaculty = useWatch({ control, name: "enrollment.faculty" });

  useEffect(() => {
    // Reset program if faculty changes
    setValue("enrollment.program", "");
  }, [selectedFaculty, setValue]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Academic Enrollment Details</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Faculty/School <span className="text-red-500">*</span></label>
          <select 
            {...register("enrollment.faculty")} 
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
              errors.enrollment?.faculty
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          >
            <option value="">Select Faculty</option>
            {faculties.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
          {errors.enrollment?.faculty && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.enrollment?.faculty?.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Program <span className="text-red-500">*</span></label>
          <select 
            {...register("enrollment.program")} 
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
              errors.enrollment?.program
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          >
            <option value="">Select Program</option>
            {programsMap[selectedFaculty || ""]?.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.enrollment?.program && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.enrollment?.program?.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Course Level <span className="text-red-500">*</span></label>
          <select 
            {...register("enrollment.courseLevel")} 
            className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
              errors.enrollment?.courseLevel
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
          >
            <option value="">Select Course Level</option>
            {courseLevels.map((cl) => (
              <option key={cl} value={cl}>{cl}</option>
            ))}
          </select>
          {errors.enrollment?.courseLevel && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.enrollment?.courseLevel?.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Academic Year <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            {...register("enrollment.academicYear")} 
            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
              errors.enrollment?.academicYear
                ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
            }`}
            placeholder="e.g., 2024-2025"
          />
          {errors.enrollment?.academicYear && (
            <p className="text-red-600 text-sm mt-2 font-medium">{errors.enrollment?.academicYear?.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Semester/Class</label>
          <input 
            type="text" 
            {...register("enrollment.semesterOrClass")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., Semester 1"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Section</label>
          <input 
            type="text" 
            {...register("enrollment.section")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., A, B, C"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Roll Number</label>
          <input 
            type="text" 
            {...register("enrollment.rollNumber")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., 001"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Registration Number</label>
          <input 
            type="text" 
            {...register("enrollment.registrationNumber")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            placeholder="e.g., REG-2024-001"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Enrollment Date</label>
          <input 
            type="date" 
            {...register("enrollment.enrollDate")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Academic Status</label>
          <select 
            {...register("enrollment.academicStatus")} 
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          >
            <option value="">Select Status</option>
            {academicStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentSection;
