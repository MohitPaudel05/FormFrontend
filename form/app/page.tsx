// app/page.tsx
"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentFullSchema, StudentFull } from "@/types/student";
import { postStudentForm } from "@/services/api";

// Import all your section components
import PersonalDetails from "@/components/studentForm/PersonalAndContact";
import CitizenshipDetails from "@/components/studentForm/CitizenshipSection";
import ContactDetails from "@/components/studentForm/ContactInfoSection";
import AddressDetails from "@/components/studentForm/AddressSection";
import ParentDetails from "@/components/studentForm/ParentGuardianSection";
import AcademicDetails from "@/components/studentForm/EnrollmentSection";
import EmergencyContactDetails from "@/components/studentForm/EmergencyContactSection";
import FinancialDetails from "@/components/studentForm/FinancialDetails";
import ExtracurricularDetails from "@/components/studentForm/QualificationSection";
import InterestsDetails from "@/components/studentForm/InterestsAwardsSection";
import HostelTransportDetails from "@/components/studentForm/HostelTransportSection";
import Declaration from "@/components/studentForm/DeclarationSection";
import Button from "@/components/ui/Button";

const StudentApplicationForm = () => {
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const methods = useForm({
    resolver: zodResolver(studentFullSchema) as any,
    mode: "onSubmit",
    defaultValues: {
      student: { 
        firstName: "", 
        lastName: "", 
        dateOfBirth: "",
        email: "",
        mobileNumber: "",
        gender: ""
      },
      secondaryInfo: {
        alternateEmail: "",
        alternateMobileNumber: "",
        bloodGroup: "",
        maritalStatus: "",
        religion: ""
      },
      citizenship: { 
        citizenshipNumber: "", 
        citizenshipIssueDate: "", 
        citizenshipIssueDistrict: "" 
      },
      emergency: { 
        emergencyContactName: "", 
        emergencyContactRelation: "", 
        emergencyContactNumber: "" 
      },
      disability: { 
        disabilityStatus: "None"
      },
      ethnicity: {
        ethnicityName: "",
        ethnicityGroup: ""
      },
      addresses: [
        { 
          addressType: "", 
          province: "", 
          district: "", 
          municipality: "", 
          wardNumber: "", 
          tole: "",
          houseNumber: ""
        }
      ],
      parents: [
        { 
          parentType: "Father", 
          fullName: "", 
          mobileNumber: "",
          occupation: "",
          designation: "",
          organization: "",
          email: "",
          annualFamilyIncome: ""
        },
        { 
          parentType: "Mother", 
          fullName: "", 
          mobileNumber: "",
          occupation: "",
          designation: "",
          organization: "",
          email: "",
          annualFamilyIncome: ""
        }
      ],
      programEnrollments: { 
        faculty: "", 
        degreeProgram: "",
        registrationNumber: "",
        academicSessions: []
      },
      academicHistories: [],
      scholarships: { 
        feeCategory: ""
      },
      bankDetails: {
        accountHolderName: "",
        bankName: "",
        accountNumber: "",
        branch: ""
      },
      achievements: [],
      studentExtraInfos: {
        hostellerStatus: "",
        transportation: "",
        extracurricularInterests: [],
        otherInterest: "",
      },
      declaration: { 
        isAgreed: false, 
        dateOfApplication: new Date().toISOString().split("T")[0], 
        place: "" 
      },
    },
  });

  const onSubmit = async (data: any) => {
    setSubmitMessage(null);
    setShowAlert(true);
    try {
      console.log("Submitting form data:", data);
      await postStudentForm(data);
      setSubmitMessage({ type: "success", text: "Γ£à Form submitted successfully!" });
      methods.reset();
      // Auto-hide success message after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to submit form. Check browser console for details.";
      setSubmitMessage({ 
        type: "error", 
        text: `Error: ${errorMessage}`
      });
      // Keep error message visible longer
      setTimeout(() => setShowAlert(false), 8000);
    }
  };

  const handleFormSubmit = async () => {
    const errors = methods.formState.errors;
    if (Object.keys(errors).length > 0) {
      const errorList = Object.entries(errors)
        .map(([key, value]: any) => `${key}: ${value?.message || "Invalid field"}`)
        .join("\n");
      setSubmitMessage({ 
        type: "error", 
        text: `Γ¥î Validation Errors:\n\n${errorList}`
      });
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 8000);
      return;
    }
    methods.handleSubmit(onSubmit as any)();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Alert Banner at Top */}
      {showAlert && submitMessage && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-2xl mx-auto">
          <div
            className={`p-5 rounded-lg text-white font-semibold shadow-2xl border-l-4 animate-pulse ${
              submitMessage.type === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-300"
                : "bg-gradient-to-r from-red-500 to-red-600 border-red-300"
            }`}
          >
            {submitMessage.text}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Complete Your Registration</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-3">Student Application Form</h1>
          <p className="text-lg text-gray-600">Fill in all required fields marked with <span className="text-red-500 font-bold">*</span></p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className="space-y-6">
            {/* Personal Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <PersonalDetails />
              </div>
            </div>

            {/* Citizenship Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <CitizenshipDetails />
              </div>
            </div>

            {/* Contact Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <ContactDetails />
              </div>
            </div>

            {/* Emergency Contact Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <EmergencyContactDetails />
              </div>
            </div>

            {/* Address Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <AddressDetails />
              </div>
            </div>

            {/* Parent Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <ParentDetails />
              </div>
            </div>

            {/* Academic Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <AcademicDetails />
              </div>
            </div>

            {/* Financial Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <FinancialDetails />
              </div>
            </div>

            {/* Qualifications */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <ExtracurricularDetails />
              </div>
            </div>

            {/* Interests & Awards */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <InterestsDetails />
              </div>
            </div>

            {/* Hostel & Transport */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <HostelTransportDetails />
              </div>
            </div>

            {/* Declaration */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <Declaration />
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-12 py-12">
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  onClick={() => {
                    console.log("Current form values:", methods.getValues());
                    console.log("Current form errors:", methods.formState.errors);
                  }}
                  className="relative overflow-hidden px-12 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {methods.formState.isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      
                      <span>Submit Application</span>
                    </span>
                  )}
                </Button>
              </div>
              
              {submitMessage && (
                <div
                  className={`mt-8 mx-auto max-w-2xl p-6 rounded-xl text-center font-semibold text-base border-l-4 transition-all duration-300 ${
                    submitMessage.type === "success"
                      ? "bg-green-50 text-green-700 border-green-500"
                      : "bg-red-50 text-red-700 border-red-500"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default StudentApplicationForm;
