"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStudentById } from "../../../services/api";

const StudentDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const [student, setStudent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        console.log("🔄 Fetching student with ID:", id);
        const data = await getStudentById(parseInt(id));
        console.log("✓ Fetched student data from API:", data);
        console.log("✓ Student firstName:", data?.firstName);
        console.log("✓ Student secondaryInfo:", data?.secondaryInfo);
        console.log("✓ Student citizenship:", data?.citizenship);
        console.log("✓ Student programEnrollments:", data?.programEnrollments);
        setStudent(data);
      } catch (err: any) {
        console.error("✗ Error fetching student:", err);
        console.error("✗ Error details:", err.response?.data || err.message);
        setError("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 font-semibold mb-6 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg text-red-900">
            <p className="font-semibold">{error || "Student not found"}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Buttons */}
        <div className="flex gap-4 mb-6">
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-800 font-semibold inline-block transition-all duration-200"
          >
            ← Back to Dashboard
          </Link>
          <Link
            href={`/student/${id}/edit`}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            ✏️ Edit Student
          </Link>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-md p-8 text-white mb-8">
          <div className="flex items-center gap-6">
            {student?.imagePath ? (
              <img
                src={`https://localhost:7190/${student.imagePath}`}
                alt={`${student?.firstName || ""} ${student?.lastName || ""}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center border-4 border-white">
                <span className="text-sm text-white font-semibold">No Photo</span>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {student?.firstName || "?"} {student?.lastName || "?"}
              </h1>
              <p className="text-blue-100">Student ID: #{student?.id}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">First Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.firstName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Last Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.lastName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Middle Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.middleName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Date of Birth</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Gender</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.gender || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Place of Birth</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.placeOfBirth || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Email</p>
              <p className="text-gray-900 font-semibold text-lg mt-1 break-all">{student?.email || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Mobile Number</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.mobileNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Alternate Email</p>
              <p className="text-gray-900 font-semibold text-lg mt-1 break-all">{student?.secondaryInfo?.alternateEmail || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Alternate Mobile</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.secondaryInfo?.alternateMobileNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Secondary Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Additional Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Blood Group</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.secondaryInfo?.bloodGroup || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Marital Status</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.secondaryInfo?.maritalStatus || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Religion</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.secondaryInfo?.religion || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Disability Status</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.disability?.disabilityStatus || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Ethnicity</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.ethnicity?.ethnicityName || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Citizenship Information */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Citizenship Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Citizenship Number</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.citizenship?.citizenshipNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Issue Date</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">
                {student?.citizenship?.citizenshipIssueDate ? new Date(student.citizenship.citizenshipIssueDate).toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Issue District</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.citizenship?.citizenshipIssueDistrict || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Program Enrollment */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Program Enrollment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Faculty</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.programEnrollments?.faculty || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Degree Program</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.programEnrollments?.degreeProgram || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Registration Number</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.programEnrollments?.registrationNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Emergency Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Contact Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.emergency?.emergencyContactName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Relation</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.emergency?.emergencyContactRelation || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Contact Number</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.emergency?.emergencyContactNumber || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Bank Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Account Holder Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.bankDetails?.accountHolderName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Bank Name</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.bankDetails?.bankName || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Account Number</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.bankDetails?.accountNumber || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Branch</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.bankDetails?.branch || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-500 pb-3">
            Scholarships & Financial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Fee Category</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.scholarships?.feeCategory || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Scholarship Type</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.scholarships?.scholarshipType || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Scholarship Provider</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.scholarships?.scholarshipProvider || "N/A"}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-semibold">Scholarship Amount</p>
              <p className="text-gray-900 font-semibold text-lg mt-1">{student?.scholarships?.scholarshipAmount || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-8">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 inline-block"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
