"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getStudentById, updateStudent } from "../../../../services/api";
import { StudentFlat } from "../../../../types/student";
import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PersonalAndContact from "../../../../components/studentForm/PersonalAndContact";
import ContactInfoSection from "../../../../components/studentForm/ContactInfoSection";
import CitizenshipSection from "../../../../components/studentForm/CitizenshipSection";
import EmergencyContactSection from "../../../../components/studentForm/EmergencyContactSection";
import AddressSection from "../../../../components/studentForm/AddressSection";
import EnrollmentSection from "../../../../components/studentForm/EnrollmentSection";
import ParentGuardianSection from "../../../../components/studentForm/ParentGuardianSection";
import QualificationSection from "../../../../components/studentForm/QualificationSection";
import FinancialDetails from "../../../../components/studentForm/FinancialDetails";
import InterestsAwardsSection from "../../../../components/studentForm/InterestsAwardsSection";
import HostelTransportSection from "../../../../components/studentForm/HostelTransportSection";
import DeclarationSection from "../../../../components/studentForm/DeclarationSection";

// Helper function to clean up optional file fields - only include if they're actual File objects
const cleanupFileFields = (data: any): any => {
  const cleaned = JSON.parse(JSON.stringify(data)); // Deep clone to avoid reference issues
  
  // Handle citizenship photos - only include if they're File objects
  if (cleaned.citizenship) {
    // Only delete from the object - FormData will skip undefined/null
    if (!cleaned.citizenship.citizenshipFrontPhoto || !(cleaned.citizenship.citizenshipFrontPhoto instanceof File)) {
      cleaned.citizenship.citizenshipFrontPhoto = undefined; // Set to undefined instead of deleting
    }
    if (!cleaned.citizenship.citizenshipBackPhoto || !(cleaned.citizenship.citizenshipBackPhoto instanceof File)) {
      cleaned.citizenship.citizenshipBackPhoto = undefined;
    }
  }
  
  // Handle academic history documents - only include if they're File objects
  if (cleaned.academicHistories && Array.isArray(cleaned.academicHistories)) {
    cleaned.academicHistories = cleaned.academicHistories.map((history: any) => {
      const cleanedHistory = JSON.parse(JSON.stringify(history));
      
      if (!cleanedHistory.photo || !(cleanedHistory.photo instanceof File)) {
        cleanedHistory.photo = undefined;
      }
      if (!cleanedHistory.signature || !(cleanedHistory.signature instanceof File)) {
        cleanedHistory.signature = undefined;
      }
      if (!cleanedHistory.characterCertificate || !(cleanedHistory.characterCertificate instanceof File)) {
        cleanedHistory.characterCertificate = undefined;
      }
      if (!cleanedHistory.marksheet || !(cleanedHistory.marksheet instanceof File)) {
        cleanedHistory.marksheet = undefined;
      }
      if (!cleanedHistory.provisional || !(cleanedHistory.provisional instanceof File)) {
        cleanedHistory.provisional = undefined;
      }
      
      return cleanedHistory;
    });
  }
  
  // Handle profile image - only include if it's a File object
  if (cleaned.student) {
    if (!cleaned.student.image || !(cleaned.student.image instanceof File)) {
      cleaned.student.image = undefined;
    }
  }
  
  return cleaned;
};

// Helper function to normalize addressType from backend (numeric) to frontend (string)
const normalizeAddressType = (value: any): "Permanent" | "Temporary" | "SameAsPermanent" => {
  if (!value && value !== 0) return "Permanent";
  
  // If it's already a string, validate it's a valid enum value
  if (typeof value === "string") {
    if (["Permanent", "Temporary", "SameAsPermanent"].includes(value)) {
      return value as "Permanent" | "Temporary" | "SameAsPermanent";
    }
  }
  
  // If it's a number, convert using the map: 1=Permanent, 2=Temporary, 3=SameAsPermanent
  if (typeof value === "number") {
    const addressTypeMap: Record<number, string> = {
      1: "Permanent",
      2: "Temporary",
      3: "SameAsPermanent",
    };
    const mapped = addressTypeMap[value];
    if (mapped) {
      console.log(` Converted numeric addressType ${value} to "${mapped}"`);
      return mapped as "Permanent" | "Temporary" | "SameAsPermanent";
    }
  }
  
  // Default fallback
  return "Permanent";
};

const StudentEditPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<{ type: string; text: string; details?: Record<string, string> } | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [fullStudentData, setFullStudentData] = useState<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const methods = useForm<any>({
    mode: "onBlur",
    resolver: zodResolver(z.object({}).passthrough()),
  });

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const response = await getStudentById(parseInt(id));
        
        if (!response) {
          setError("No student data returned");
          setLoading(false);
          return;
        }
        
        setFullStudentData(response);
        setDataLoaded(true);
        setLoading(false);
      } catch (err: any) {
        setError(`Failed to load student data: ${err.message}`);
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Separate effect to reset form once data is loaded
  useEffect(() => {
    if (!dataLoaded || !fullStudentData) {
      return;
    }

    const resetData = {
      // Personal Information - nested under "student"
      student: {
        firstName: fullStudentData.student?.firstName || "",
        lastName: fullStudentData.student?.lastName || "",
        middleName: fullStudentData.student?.middleName || "",
        dateOfBirth: fullStudentData.student?.dateOfBirth ? fullStudentData.student.dateOfBirth.split('T')[0] : "",
        placeOfBirth: fullStudentData.student?.placeOfBirth || "",
        gender: fullStudentData.student?.gender || "",
        email: fullStudentData.student?.email || "",
        mobileNumber: fullStudentData.student?.mobileNumber || "",
        imagePath: fullStudentData.student?.imagePath || "",
        image: null,
      },
      
      // Secondary Information
      secondaryInfo: {
        alternateEmail: fullStudentData.secondaryInfo?.alternateEmail || "",
        alternateMobileNumber: fullStudentData.secondaryInfo?.alternateMobileNumber || "",
        bloodGroup: fullStudentData.secondaryInfo?.bloodGroup || "",
        maritalStatus: fullStudentData.secondaryInfo?.maritalStatus || "",
        religion: fullStudentData.secondaryInfo?.religion || "",
      },
      
      // Disability
      disability: {
        disabilityStatus: fullStudentData.disability?.disabilityStatus || "None",
        disabilityType: fullStudentData.disability?.disabilityType || "",
        disabilityPercentage: fullStudentData.disability?.disabilityPercentage || "",
      },
      
      // Ethnicity
      ethnicity: {
        ethnicityName: fullStudentData.ethnicity?.ethnicityName || "",
        ethnicityGroup: fullStudentData.ethnicity?.ethnicityGroup || "",
      },
      
      // Emergency Contact
      emergency: {
        emergencyContactName: fullStudentData.emergency?.emergencyContactName || "",
        emergencyContactRelation: fullStudentData.emergency?.emergencyContactRelation || "",
        emergencyContactNumber: fullStudentData.emergency?.emergencyContactNumber || "",
      },
      
      // Citizenship
      citizenship: {
        citizenshipNumber: fullStudentData.citizenship?.citizenshipNumber || "",
        citizenshipIssueDate: fullStudentData.citizenship?.citizenshipIssueDate ? fullStudentData.citizenship.citizenshipIssueDate.split('T')[0] : "",
        citizenshipIssueDistrict: fullStudentData.citizenship?.citizenshipIssueDistrict || "",
        citizenshipFrontPhotoPath: fullStudentData.citizenship?.citizenshipFrontPhotoPath || "",
        citizenshipBackPhotoPath: fullStudentData.citizenship?.citizenshipBackPhotoPath || "",
        citizenshipFrontPhoto: null,
        citizenshipBackPhoto: null,
      },
      
      // Addresses - normalize addressType from backend enum (numeric) to frontend enum (string)
      addresses: (fullStudentData.addresses || []).map((addr: any) => ({
        ...addr,
        addressType: normalizeAddressType(addr.addressType),
      })),
      
      // Program Enrollment
      programEnrollments: {
        faculty: fullStudentData.programEnrollments?.faculty || "",
        degreeProgram: fullStudentData.programEnrollments?.degreeProgram || "",
        registrationNumber: fullStudentData.programEnrollments?.registrationNumber || "",
        academicSessions: fullStudentData.programEnrollments?.academicSessions || [],
      },
      
      // Academic Histories
      academicHistories: fullStudentData.academicHistories || [],
      
      // Scholarships & Financial
      scholarships: {
        feeCategory: fullStudentData.scholarships?.feeCategory || "",
        scholarshipType: fullStudentData.scholarships?.scholarshipType || "",
        scholarshipProvider: fullStudentData.scholarships?.scholarshipProvider || "",
        scholarshipAmount: fullStudentData.scholarships?.scholarshipAmount || "",
      },
      
      // Bank Details
      bankDetails: {
        accountHolderName: fullStudentData.bankDetails?.accountHolderName || "",
        bankName: fullStudentData.bankDetails?.bankName || "",
        accountNumber: fullStudentData.bankDetails?.accountNumber || "",
        branch: fullStudentData.bankDetails?.branch || "",
      },
      
      // Achievements
      achievements: fullStudentData.achievements || [],
      
      // Student Extra Info (Hostel, Transport, Interests)
      studentExtraInfos: {
        hostellerStatus: fullStudentData.studentExtraInfos?.hostellerStatus || "",
        transportation: fullStudentData.studentExtraInfos?.transportation || "",
        extracurricularInterests: fullStudentData.studentExtraInfos?.extracurricularInterests || [],
        otherInterest: fullStudentData.studentExtraInfos?.otherInterest || "",
      },
      
      // Declaration
      declaration: {
        isAgreed: Boolean(fullStudentData.declaration?.isAgreed),
        dateOfApplication: fullStudentData.declaration?.dateOfApplication ? fullStudentData.declaration.dateOfApplication.split('T')[0] : "",
        place: fullStudentData.declaration?.place || "",
      },
      
      // Parents
      parents: fullStudentData.parents || [],
    };
    
    console.log(" Constructed resetData structure:", resetData);
    console.log(" First name to be set:", resetData.student.firstName);
    console.log(" Gender to be set:", resetData.student.gender);
    console.log(" Declaration isAgreed to be set:", resetData.declaration.isAgreed, "Type:", typeof resetData.declaration.isAgreed);
    console.log(" studentExtraInfos to be set:", resetData.studentExtraInfos);
    
    methods.reset(resetData);
  }, [dataLoaded, fullStudentData, methods]);

  const onSubmit = async (data: any) => {
    setSubmitMessage(null);
    setShowAlert(true);
    try {
      const submitData: any = {
        student: {
          firstName: data.student?.firstName || fullStudentData?.student?.firstName || "",
          lastName: data.student?.lastName || fullStudentData?.student?.lastName || "",
          middleName: data.student?.middleName || fullStudentData?.student?.middleName || "",
          email: data.student?.email || fullStudentData?.student?.email || "",
          mobileNumber: data.student?.mobileNumber || fullStudentData?.student?.mobileNumber || "",
          dateOfBirth: data.student?.dateOfBirth || fullStudentData?.student?.dateOfBirth || "",
          gender: data.student?.gender || fullStudentData?.student?.gender || "",
          placeOfBirth: data.student?.placeOfBirth || fullStudentData?.student?.placeOfBirth || "",
          imagePath: data.student?.imagePath || fullStudentData?.student?.imagePath || "",
          // Only include image if it's an actual File object
          ...(data.student?.image instanceof File && { image: data.student.image }),
        },
        secondaryInfo: {
          alternateEmail: data.secondaryInfo?.alternateEmail || fullStudentData?.secondaryInfo?.alternateEmail || "",
          alternateMobileNumber: data.secondaryInfo?.alternateMobileNumber || fullStudentData?.secondaryInfo?.alternateMobileNumber || "",
          bloodGroup: data.secondaryInfo?.bloodGroup || fullStudentData?.secondaryInfo?.bloodGroup || "",
          maritalStatus: data.secondaryInfo?.maritalStatus || fullStudentData?.secondaryInfo?.maritalStatus || "",
          religion: data.secondaryInfo?.religion || fullStudentData?.secondaryInfo?.religion || "",
        },
        disability: {
          disabilityStatus: data.disability?.disabilityStatus || fullStudentData?.disability?.disabilityStatus || "None",
          disabilityType: data.disability?.disabilityType || fullStudentData?.disability?.disabilityType || "",
          disabilityPercentage: data.disability?.disabilityPercentage || fullStudentData?.disability?.disabilityPercentage || "",
        },
        ethnicity: {
          ethnicityName: data.ethnicity?.ethnicityName || fullStudentData?.ethnicity?.ethnicityName || "",
          ethnicityGroup: data.ethnicity?.ethnicityGroup || fullStudentData?.ethnicity?.ethnicityGroup || "",
        },
        emergency: {
          emergencyContactName: data.emergency?.emergencyContactName || fullStudentData?.emergency?.emergencyContactName || "",
          emergencyContactRelation: data.emergency?.emergencyContactRelation || fullStudentData?.emergency?.emergencyContactRelation || "",
          emergencyContactNumber: data.emergency?.emergencyContactNumber || fullStudentData?.emergency?.emergencyContactNumber || "",
        },
        citizenship: {
          citizenshipNumber: data.citizenship?.citizenshipNumber || fullStudentData?.citizenship?.citizenshipNumber || "",
          citizenshipIssueDate: data.citizenship?.citizenshipIssueDate || fullStudentData?.citizenship?.citizenshipIssueDate || "",
          citizenshipIssueDistrict: data.citizenship?.citizenshipIssueDistrict || fullStudentData?.citizenship?.citizenshipIssueDistrict || "",
          citizenshipFrontPhotoPath: data.citizenship?.citizenshipFrontPhotoPath || fullStudentData?.citizenship?.citizenshipFrontPhotoPath || "",
          citizenshipBackPhotoPath: data.citizenship?.citizenshipBackPhotoPath || fullStudentData?.citizenship?.citizenshipBackPhotoPath || "",
          // Always include photo fields - send File if being updated, otherwise send null
          citizenshipFrontPhoto: data.citizenship?.citizenshipFrontPhoto instanceof File ? data.citizenship.citizenshipFrontPhoto : null,
          citizenshipBackPhoto: data.citizenship?.citizenshipBackPhoto instanceof File ? data.citizenship.citizenshipBackPhoto : null,
        },
        addresses: data.addresses?.length > 0 ? data.addresses.map((addr: any) => ({
          addressType: addr.addressType || "",
          province: addr.province || "",
          district: addr.district || "",
          municipality: addr.municipality || "",
          wardNumber: addr.wardNumber || "",
          tole: addr.tole || "",
          houseNumber: addr.houseNumber || "",
        })) : (fullStudentData?.addresses || []),
        parents: data.parents?.length > 0 ? data.parents.map((parent: any) => ({
          parentType: parent.parentType || "",
          fullName: parent.fullName || "",
          mobileNumber: parent.mobileNumber || "",
          occupation: parent.occupation || "",
          designation: parent.designation || "",
          organization: parent.organization || "",
          email: parent.email || "",
          annualFamilyIncome: parent.annualFamilyIncome || "",
        })) : (fullStudentData?.parents || []),
        
        // ALWAYS include these - never set to null
        programEnrollments: {
          faculty: data.programEnrollments?.faculty || fullStudentData?.programEnrollments?.faculty || "",
          degreeProgram: data.programEnrollments?.degreeProgram || fullStudentData?.programEnrollments?.degreeProgram || "",
          registrationNumber: data.programEnrollments?.registrationNumber || fullStudentData?.programEnrollments?.registrationNumber || "",
          academicSessions: data.programEnrollments?.academicSessions?.length > 0 ? data.programEnrollments.academicSessions : (fullStudentData?.programEnrollments?.academicSessions || []),
        },
        scholarships: {
          feeCategory: data.scholarships?.feeCategory || fullStudentData?.scholarships?.feeCategory || "",
          scholarshipType: data.scholarships?.scholarshipType || fullStudentData?.scholarships?.scholarshipType || "",
          scholarshipProvider: data.scholarships?.scholarshipProvider || fullStudentData?.scholarships?.scholarshipProvider || "",
          scholarshipAmount: data.scholarships?.scholarshipAmount || fullStudentData?.scholarships?.scholarshipAmount || "",
        },
        bankDetails: {
          accountHolderName: data.bankDetails?.accountHolderName || fullStudentData?.bankDetails?.accountHolderName || "",
          bankName: data.bankDetails?.bankName || fullStudentData?.bankDetails?.bankName || "",
          accountNumber: data.bankDetails?.accountNumber || fullStudentData?.bankDetails?.accountNumber || "",
          branch: data.bankDetails?.branch || fullStudentData?.bankDetails?.branch || "",
        },
        declaration: {
          isAgreed: data.declaration?.isAgreed !== undefined ? data.declaration.isAgreed : (fullStudentData?.declaration?.isAgreed || false),
          dateOfApplication: data.declaration?.dateOfApplication || fullStudentData?.declaration?.dateOfApplication || new Date().toISOString().split('T')[0],
          place: data.declaration?.place || fullStudentData?.declaration?.place || "",
        },
        
        academicHistories: (data.academicHistories?.length > 0 ? data.academicHistories : (fullStudentData?.academicHistories || [])).map((history: any) => ({
          qualification: history.qualification || "",
          board: history.board || "",
          institution: history.institution || "",
          passedYear: history.passedYear || "",
          divisionGPA: history.divisionGPA || "",
          photoPath: history.photoPath || "",
          signaturePath: history.signaturePath || "",
          characterCertificatePath: history.characterCertificatePath || "",
          marksheetPath: history.marksheetPath || "",
          provisionalPath: history.provisionalPath || "",
          // Only include file fields if they are actual File objects
          ...(history.photo instanceof File && { photo: history.photo }),
          ...(history.signature instanceof File && { signature: history.signature }),
          ...(history.characterCertificate instanceof File && { characterCertificate: history.characterCertificate }),
          ...(history.marksheet instanceof File && { marksheet: history.marksheet }),
          ...(history.provisional instanceof File && { provisional: history.provisional }),
        })),
        achievements: data.achievements?.length > 0 ? data.achievements : (fullStudentData?.achievements || []),
        studentExtraInfos: fullStudentData?.studentExtraInfos || {},
      };

      // ✅ Submit data directly - file fields are already properly filtered using spread operators
      // Only File objects are included for: citizenship photos, profile picture, academic history files
      console.log("📤 Submitting student data:", {
        citizenship: {
          front: submitData.citizenship?.citizenshipFrontPhoto,
          back: submitData.citizenship?.citizenshipBackPhoto
        },
        profilePicture: submitData.student?.image,
        academicHistoriesCount: submitData.academicHistories?.length
      });

      const response = await updateStudent(parseInt(id), submitData);

      setSubmitMessage({ type: "success", text: "✅ Student updated successfully!" });
      setShowAlert(true);
      
      // Show browser alert
      alert("✅ Student data updated successfully!");
    } catch (error: any) {
      let errorMessage = "Failed to update student.";
      let errorFields: { [key: string]: string } = {};

      if (error.response?.data) {
        if (error.response.data.message) {
          errorMessage = error.response.data.message;
          console.error(" Backend Error Message:", errorMessage);
        } else if (error.response?.data?.errors) {
          // Handle validation errors - use React Hook Form's setError for inline display
          const errors = error.response.data.errors;
          console.error("VALIDATION ERRORS:", errors);
          console.error("  Error Fields:");
          
          // Set React Hook Form errors for inline display
          Object.entries(errors).forEach(([fieldName, errorMsg]: [string, any]) => {
            console.error(`   ${fieldName}: ${errorMsg}`);
            errorFields[fieldName] = errorMsg;
            
            // Comprehensive mapping of backend field names to form field paths
            let formFieldPath = fieldName;
            const lowerFieldName = fieldName.toLowerCase();
            
            // Student fields
            if (lowerFieldName.includes('firstname')) {
              formFieldPath = 'student.firstName';
            } else if (lowerFieldName.includes('lastname')) {
              formFieldPath = 'student.lastName';
            } else if (lowerFieldName.includes('middlename')) {
              formFieldPath = 'student.middleName';
            } else if (lowerFieldName.includes('email')) {
              formFieldPath = 'student.email';
            } else if (lowerFieldName.includes('mobilenumber')) {
              formFieldPath = 'student.mobileNumber';
            } else if (lowerFieldName.includes('dateofbirth')) {
              formFieldPath = 'student.dateOfBirth';
            } else if (lowerFieldName.includes('placeofbirth')) {
              formFieldPath = 'student.placeOfBirth';
            } else if (lowerFieldName.includes('gender')) {
              formFieldPath = 'student.gender';
            }
            // Secondary Info fields
            else if (lowerFieldName.includes('alternateemail')) {
              formFieldPath = 'secondaryInfo.alternateEmail';
            } else if (lowerFieldName.includes('alternatemobilenumber')) {
              formFieldPath = 'secondaryInfo.alternateMobileNumber';
            } else if (lowerFieldName.includes('bloodgroup')) {
              formFieldPath = 'secondaryInfo.bloodGroup';
            } else if (lowerFieldName.includes('maritalstatus')) {
              formFieldPath = 'secondaryInfo.maritalStatus';
            } else if (lowerFieldName.includes('religion')) {
              formFieldPath = 'secondaryInfo.religion';
            }
            // Citizenship fields
            else if (lowerFieldName.includes('citizenshippumber')) {
              formFieldPath = 'citizenship.citizenshipNumber';
            } else if (lowerFieldName.includes('citizenshipissuedate')) {
              formFieldPath = 'citizenship.citizenshipIssueDate';
            } else if (lowerFieldName.includes('citizenshipissuedistrict')) {
              formFieldPath = 'citizenship.citizenshipIssueDistrict';
            }
            // Emergency Contact fields
            else if (lowerFieldName.includes('emergencycontactname')) {
              formFieldPath = 'emergency.emergencyContactName';
            } else if (lowerFieldName.includes('emergencycontactrelation')) {
              formFieldPath = 'emergency.emergencyContactRelation';
            } else if (lowerFieldName.includes('emergencycontactnumber')) {
              formFieldPath = 'emergency.emergencyContactNumber';
            }
            // Disability fields
            else if (lowerFieldName.includes('disabilitystatus')) {
              formFieldPath = 'disability.disabilityStatus';
            } else if (lowerFieldName.includes('disabilitytype')) {
              formFieldPath = 'disability.disabilityType';
            } else if (lowerFieldName.includes('disabilitypercentage')) {
              formFieldPath = 'disability.disabilityPercentage';
            }
            // Ethnicity fields
            else if (lowerFieldName.includes('ethnicityname')) {
              formFieldPath = 'ethnicity.ethnicityName';
            } else if (lowerFieldName.includes('ethnicitygroup')) {
              formFieldPath = 'ethnicity.ethnicityGroup';
            }
            
            console.log(`Mapping backend field "${fieldName}" to form path "${formFieldPath}"`);
            
            // Use setError from React Hook Form to show field-level errors
            methods.setError(formFieldPath as any, {
              type: "server",
              message: Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage,
            });
          });
          
          errorMessage = " Please fix the errors below";
          console.error("🚫 Validation errors mapped:", errors);
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
          console.error("   String error response:", errorMessage);
        } else {
          errorMessage = JSON.stringify(error.response.data);
          console.error("   JSON error response:", errorMessage);
        }
      } else {
        errorMessage = error.message || "Failed to update student.";
      }

      setSubmitMessage({
        type: "error",
        text: errorMessage,
        details: Object.keys(errorFields).length > 0 ? errorFields : undefined,
      });
      setShowAlert(true);
      
      // Show browser alert with error count
      const errorCount = Object.keys(errorFields).length;
      alert(`❌ Failed to update student!\n\nErrors: ${errorCount}\n\n${errorMessage}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="text-2xl font-bold text-slate-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50">
        <div className="text-xl font-bold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 py-8">

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Edit Student</h1>

        {showAlert && submitMessage && (
          <div
            className={`mb-6 p-6 rounded-lg border-l-4 shadow-md ${
              submitMessage.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {submitMessage.type === "success" ? "✅" : "❌"}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">{submitMessage.text}</p>
                {submitMessage.type === "error" && submitMessage.details && (
                  <div className="mt-3 text-sm space-y-1">
                    <p className="font-semibold mb-2">❌ Fields with errors:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {Object.entries(submitMessage.details).map(([field, msg]: [string, any]) => (
                        <li key={field} className="ml-2">
                          <span className="font-medium">{field}:</span> {msg}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <PersonalAndContact fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Citizenship Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <CitizenshipSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Contact Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <ContactInfoSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Emergency Contact Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <EmergencyContactSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Address Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <AddressSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Parent Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <ParentGuardianSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Enrollment Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <EnrollmentSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Academic Qualifications */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <QualificationSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Financial Details */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <FinancialDetails fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Interests & Awards */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <InterestsAwardsSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Hostel & Transport */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <HostelTransportSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Declaration */}
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300">
                <DeclarationSection fullStudentData={fullStudentData} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
              <Link
                href={`/student/${id}`}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-all duration-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>

    
  );
  
};

export default StudentEditPage;
