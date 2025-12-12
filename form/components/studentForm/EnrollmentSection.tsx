"use client";

import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import { StudentFull } from "../../types/student";

const facultyOptions = ["Science", "Management", "Humanities", "Engineering", "Other"];
const degreeProgramOptions = ["BSc", "BBA", "BA", "BE", "Masters", "PlusTwo"];
const academicYearOptions = ["FirstYear", "SecondYear", "ThirdYear", "FourthYear"];
const semesterOptions = ["FirstSemester", "SecondSemester", "ThirdSemester", "FourthSemester", "FifthSemester", "SixthSemester"];
const academicStatusOptions = ["Active", "OnHold", "Completed", "DroppedOut"];

type Props = {
  fullStudentData?: any;
};

const EnrollmentSection: React.FC<Props> = ({ fullStudentData }) => {
  const { register, control, setValue, formState: { errors }, getValues } = useFormContext<StudentFull>();
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "programEnrollments.academicSessions",
  });

  // ✅ Track if we've synced from backend to avoid reinitializing
  const syncInitialized = React.useRef(false);

  // Sync academic sessions field array when fullStudentData changes
  React.useEffect(() => {
    if (fullStudentData?.programEnrollments?.academicSessions && fullStudentData.programEnrollments.academicSessions.length > 0 && !syncInitialized.current) {
      syncInitialized.current = true; // Mark as synced
      const sessions = fullStudentData.programEnrollments.academicSessions;
      
      // ✅ FIX: Only append if we need to add more fields
      const sessionsToAdd = sessions.length - fields.length;
      
      if (sessionsToAdd > 0) {
        // Only append the difference - don't duplicate
        for (let i = 0; i < sessionsToAdd; i++) {
          append({
            academicYear: "FirstYear",
            semester: "FirstSemester",
            section: "",
            rollNumber: "",
            status: "Active",
          });
        }
      }
      
      // Now update all fields with the actual data from backend
      sessions.forEach((session: any, index: number) => {
        setValue(`programEnrollments.academicSessions.${index}.academicYear`, 
          session.academicYear || "FirstYear");
        setValue(`programEnrollments.academicSessions.${index}.semester`, 
          session.semester || "FirstSemester");
        setValue(`programEnrollments.academicSessions.${index}.section`, 
          session.section || "");
        setValue(`programEnrollments.academicSessions.${index}.rollNumber`, 
          session.rollNumber || "");
        setValue(`programEnrollments.academicSessions.${index}.status`, 
          session.status || "Active");
      });
    }
  }, [fullStudentData?.programEnrollments?.academicSessions, append, setValue, fields.length]);

  // Initialize with one academic session if empty (only on component mount, not after sync)
  React.useEffect(() => {
    if (fields.length === 0 && !syncInitialized.current) {
      append({
        academicYear: "FirstYear",
        semester: "FirstSemester",
        section: "",
        rollNumber: "",
        status: "Active",
      });
    }
  }, []);

  const handleAddSession = () => {
    append({
      academicYear: "FirstYear",
      semester: "FirstSemester",
      section: "",
      rollNumber: "",
      status: "Active",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded"></div>
        <h2 className="text-3xl font-bold text-gray-900">Academic Enrollment Details</h2>
      </div>

      {/* Program Enrollment Details */}
      <div className="border-2 border-indigo-200 p-6 rounded-xl bg-indigo-50">
        <h3 className="font-bold text-lg text-gray-800 mb-5 flex items-center gap-2">
          <span className="text-indigo-600">📚</span> Program Enrollment
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">Faculty <span className="text-red-500">*</span></label>
            <select 
              {...register("programEnrollments.faculty")} 
              className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                errors.programEnrollments?.faculty
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Faculty</option>
              {facultyOptions.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            {errors.programEnrollments?.faculty && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.programEnrollments.faculty.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Degree Program <span className="text-red-500">*</span></label>
            <select 
              {...register("programEnrollments.degreeProgram")} 
              className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                errors.programEnrollments?.degreeProgram
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
            >
              <option value="">Select Program</option>
              {degreeProgramOptions.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            {errors.programEnrollments?.degreeProgram && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.programEnrollments.degreeProgram.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Registration Number <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              {...register("programEnrollments.registrationNumber")} 
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-200 ${
                errors.programEnrollments?.registrationNumber
                  ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
              }`}
              placeholder="e.g., REG-2024-001"
            />
            {errors.programEnrollments?.registrationNumber && (
              <p className="text-red-600 text-sm mt-2 font-medium">{errors.programEnrollments.registrationNumber.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Academic Sessions */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <span className="text-indigo-600">📋</span> Academic Sessions
        </h3>
        
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border-2 border-indigo-200 rounded-xl bg-white hover:border-indigo-300 transition-all duration-200">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-lg font-semibold text-gray-800">Session {index + 1}</h4>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Academic Year <span className="text-red-500">*</span></label>
                <select 
                  {...register(`programEnrollments.academicSessions.${index}.academicYear`)} 
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                    errors.programEnrollments?.academicSessions?.[index]?.academicYear
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                  }`}
                >
                  <option value="">Select Year</option>
                  {academicYearOptions.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
                {errors.programEnrollments?.academicSessions?.[index]?.academicYear && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.programEnrollments.academicSessions[index]?.academicYear?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Semester <span className="text-red-500">*</span></label>
                <select 
                  {...register(`programEnrollments.academicSessions.${index}.semester`)} 
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                    errors.programEnrollments?.academicSessions?.[index]?.semester
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                  }`}
                >
                  <option value="">Select Semester</option>
                  {semesterOptions.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.programEnrollments?.academicSessions?.[index]?.semester && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.programEnrollments.academicSessions[index]?.semester?.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Section</label>
                <input 
                  type="text" 
                  {...register(`programEnrollments.academicSessions.${index}.section`)} 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="e.g., A, B, C"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Roll Number</label>
                <input 
                  type="text" 
                  {...register(`programEnrollments.academicSessions.${index}.rollNumber`)} 
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
                  placeholder="e.g., 001"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Status <span className="text-red-500">*</span></label>
                <select 
                  {...register(`programEnrollments.academicSessions.${index}.status`)} 
                  className={`w-full px-4 py-3 border-2 rounded-lg bg-white focus:outline-none transition-all duration-200 ${
                    errors.programEnrollments?.academicSessions?.[index]?.status
                      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-500"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 hover:border-gray-400"
                  }`}
                >
                  <option value="">Select Status</option>
                  {academicStatusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.programEnrollments?.academicSessions?.[index]?.status && (
                  <p className="text-red-600 text-sm mt-2 font-medium">
                    {errors.programEnrollments.academicSessions[index]?.status?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {fields.length < 4 && (
          <button
            type="button"
            onClick={handleAddSession}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 hover:shadow-lg"
          >
            <span className="text-lg">+</span> Add Another Academic Session
          </button>
        )}
      </div>
    </div>
  );
};

export default EnrollmentSection;
