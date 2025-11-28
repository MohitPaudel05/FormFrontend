import { z } from "zod";

// Personal Details
export const personalDetailSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  placeOfBirth: z.string().optional(),
  nationality: z.string().min(1, "Nationality is required"),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
  maritalStatus: z.enum(["Single", "Married", "Divorced"]).optional(),
  religion: z.string().optional(),
  ethnicity: z.string().optional(),
});

// Citizenship
export const citizenshipSchema = z.object({
  citizenshipNumber: z.string().min(1, "Citizenship Number is required"),
  issueDate: z.string().min(1, "Issue Date is required"),
  issueDistrict: z.string().min(1, "Issue District is required"),
});

// Contact Info
export const contactInfoSchema = z.object({
  email: z.string().email("Invalid Email"),
  alternateEmail: z.string().email("Invalid Email").optional(),
  primaryMobile: z.string().min(1, "Primary Mobile is required"),
  secondaryMobile: z.string().optional(),
});

// Emergency Contact
export const emergencyContactSchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyContactRelation: z.enum(["Father", "Mother", "Guardian"]),
  emergencyContactNumber: z.string().min(1, "Emergency Contact Number is required"),
  emergencyContactEmail: z.string().email("Invalid Email").optional(),
});

// Disability
export const disabilitySchema = z.object({
  disabilityType: z.enum(["None", "Physical", "Visual", "Hearing", "Intellectual", "Multiple"]),
  description: z.string().optional(),
  percentage: z.string().optional(),
});

// Address
export const addressSchema = z.object({
  addressType: z.enum(["Permanent", "Temporary"]),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  municipality: z.string().min(1, "Municipality is required"),
  wardNumber: z.string().min(1, "Ward Number is required"),
  tole: z.string().min(1, "Tole/Street is required"),
  houseNumber: z.string().optional(),
  sameAsPermanent: z.boolean().optional(),
});

// Parent / Guardian
export const parentSchema = z.object({
  relation: z.enum(["Father", "Mother", "Guardian"]),
  fullName: z.string().min(1, "Full Name is required"),
  occupation: z.string().optional(),
  designation: z.string().optional(),
  organization: z.string().optional(),
  mobileNumber: z.string().min(1, "Mobile Number is required"),
  email: z.string().email("Invalid Email").optional(),
  annualFamilyIncome: z.enum(["<5 Lakh", "5-10 Lakh", "10-20 Lakh", ">20 Lakh"]).optional(),
});

// Enrollment
export const enrollmentSchema = z.object({
  faculty: z.string().min(1, "Faculty is required"),
  program: z.string().min(1, "Program is required"),
  courseLevel: z.string().min(1, "Course Level is required"),
  academicYear: z.string().min(1, "Academic Year is required"),
  semesterOrClass: z.string().optional(),
  section: z.string().optional(),
  rollNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  enrollDate: z.string().optional(),
  academicStatus: z.enum(["Active", "On Hold", "Completed", "Dropped Out"]).optional(),
});

// Qualification
export const qualificationSchema = z.object({
  qualificationName: z.string().min(1, "Qualification is required"),
  boardOrUniversity: z.string().optional(),
  institutionName: z.string().optional(),
  passedYear: z.string().optional(),
  divisionOrGPA: z.string().optional(),
  marksheetDocument: z.instanceof(File).optional(),
});

// Document Upload
export const documentSchema = z.object({
  type: z.string().min(1, "Document Type is required"),
  file: z.instanceof(File).optional(),
});

// Fee & Scholarship
export const feeSchema = z.object({
  feeCategory: z.enum(["Regular", "Self-Financed", "Scholarship", "Quota"]),
});

export const scholarshipSchema = z.object({
  scholarshipType: z.string().min(1, "Scholarship Type is required"),
  providerName: z.string().min(1, "Scholarship Provider Name is required"),
  amount: z.string().min(1, "Scholarship Amount is required"),
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  branch: z.string().optional(),
});

// Interests & Awards
export const interestSchema = z.object({
  interest: z.string().min(1, "Interest is required"),
  otherDetail: z.string().optional(),
});

export const awardSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuingOrganization: z.string().optional(),
  yearReceived: z.string().optional(),
});

// Hostel & Transport
export const hostelTransportSchema = z.object({
  residencyType: z.enum(["Hosteller", "Day Scholar"]),
  transportMethod: z.string().optional(),
});

// Declaration
export const declarationSchema = z.object({
  isDeclared: z.boolean(),
  dateOfApplication: z.string(),
  place: z.string().optional(),
});

// Full Form
export const studentFullSchema = z.object({
  personalDetail: personalDetailSchema,
  citizenshipInfo: citizenshipSchema,
  contactInfo: contactInfoSchema,
  emergencyContacts: z.array(emergencyContactSchema).min(1, "At least one emergency contact is required"),
  disability: disabilitySchema,
  address: z.array(addressSchema).min(1, "At least one address is required"),
  parents: z.array(parentSchema).min(1, "At least one parent/guardian is required"),
  enrollment: enrollmentSchema,
  qualifications: z.array(qualificationSchema).optional(),
  documents: z.array(documentSchema).optional(),
  feeDetail: feeSchema,
  scholarship: scholarshipSchema.optional(),
  interests: z.array(interestSchema).optional(),
  awards: z.array(awardSchema).optional(),
  hostelTransport: hostelTransportSchema,
  declaration: declarationSchema,
});

export type StudentFull = z.infer<typeof studentFullSchema>;
