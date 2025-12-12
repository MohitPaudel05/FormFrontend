"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getAllStudents, deleteStudent } from "../../services/api";
import { StudentFlat } from "../../types/student";

const DashboardPage: React.FC = () => {
  const [students, setStudents] = useState<StudentFlat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const success = await deleteStudent(id);
      if (success) {
        setStudents(students.filter((s) => s.id !== id));
        alert("Student deleted successfully!");
      } else {
        alert("Failed to delete student");
      }
    } catch (err: any) {
      console.error("Delete error:", err);
      alert("Error: " + (err.response?.data?.message || err.message || "Failed to delete student"));
    }
  };

  // Filter students
  const filteredStudents = students;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading students...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Students Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Total Students: <span className="font-bold text-blue-600">{students.length}</span>
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              + Add New Student
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6 text-red-900">
            {error}
          </div>
        )}

        {/* Students List */}
        {filteredStudents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
            <p className="text-gray-600 text-lg">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">ID</th>
                  <th className="px-6 py-4 text-left font-semibold">Photo</th>
                  <th className="px-6 py-4 text-left font-semibold">Name</th>
                  <th className="px-6 py-4 text-left font-semibold">Email</th>
                  <th className="px-6 py-4 text-left font-semibold">Mobile</th>
                  <th className="px-6 py-4 text-left font-semibold">DOB</th>
                  <th className="px-6 py-4 text-left font-semibold">Gender</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`hover:bg-blue-50 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">#{student.id}</td>
                    <td className="px-6 py-4">
                      {student.imagePath ? (
                        <img
                          src={`https://localhost:7190/${student.imagePath}`}
                          alt={`${student.firstName} ${student.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                          No photo
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {student.firstName} {student.lastName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm break-all">{student.email}</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">{student.mobileNumber}</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">{student.dateOfBirth}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          student.gender === "Male"
                            ? "bg-blue-100 text-blue-800"
                            : student.gender === "Female"
                            ? "bg-pink-100 text-pink-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {student.gender}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <Link
                          href={`/student/${student.id}/edit`}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 hover:bg-yellow-200 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-sm font-medium transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-md">
            <p className="text-blue-100 text-sm font-semibold">Total Students</p>
            <p className="text-3xl font-bold mt-2">{students.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-md">
            <p className="text-green-100 text-sm font-semibold">Male Students</p>
            <p className="text-3xl font-bold mt-2">
              {students.filter((s) => s.gender === "Male").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-6 text-white shadow-md">
            <p className="text-pink-100 text-sm font-semibold">Female Students</p>
            <p className="text-3xl font-bold mt-2">
              {students.filter((s) => s.gender === "Female").length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
