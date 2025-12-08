import { z } from "zod";

// ===== STUDENT DTO =====
export const studentSchema = z.object({
  image: z.instanceof(File).optional(),
  imagePath: z.string().optional(),
  firstName: z.string().min(1, "First Name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  placeOfBirth: z.string().optional(),
  email: z.string().email("Invalid Email"),
  mobileNumber: z.string().min(1, "Mobile Number is required"),
  gender: z.string().min(1, "Gender is required"),
});

// ===== SECONDARY INFO DTO =====
export const secondaryInfoSchema = z.object({
  alternateEmail: z.string().email("Invalid Email").optional().or(z.literal("")),
  alternateMobileNumber: z.string().optional().or(z.literal("")),
  bloodGroup: z.string().optional().or(z.literal("")),
  maritalStatus: z.string().optional().or(z.literal("")),
  religion: z.string().optional().or(z.literal("")),
});

// ===== ETHNICITY DTO =====
export const ethnicitySchema = z.object({
  ethnicityName: z.string().min(1, "Ethnicity is required"),
  ethnicityGroup: z.string().min(1, "Ethnicity Group is required"),
});

// ===== EMERGENCY DTO =====
export const emergencySchema = z.object({
  emergencyContactName: z.string().min(1, "Emergency Contact Name is required"),
  emergencyContactRelation: z.string().min(1, "Relation is required"),
  emergencyContactNumber: z.string().min(1, "Emergency Contact Number is required"),
});

// ===== DISABILITY DTO =====
export const disabilitySchema = z.object({
  disabilityStatus: z.string().default("None"),
  disabilityType: z.string().optional().or(z.literal("")),
  disabilityPercentage: z.number().optional(),
});

// ===== CITIZENSHIP DTO =====
export const citizenshipSchema = z.object({
  citizenshipNumber: z.string().min(1, "Citizenship Number is required"),
  citizenshipIssueDate: z.string().min(1, "Issue Date is required"),
  citizenshipIssueDistrict: z.string().min(1, "Issue District is required"),
  citizenshipFrontPhoto: z.instanceof(File).refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Front photo must be less than 2MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Front photo must be JPG or PNG"
  ),
  citizenshipBackPhoto: z.instanceof(File).refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Back photo must be less than 2MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Back photo must be JPG or PNG"
  ),
});

// ===== ADDRESS DTO =====
export const addressSchema = z.object({
  addressType: z.enum(["Permanent", "Temporary", "SameAsPermanent"]),
  province: z.string().min(1, "Province is required"),
  district: z.string().min(1, "District is required"),
  municipality: z.string().min(1, "Municipality is required"),
  wardNumber: z.string().min(1, "Ward Number is required"),
  tole: z.string().min(1, "Tole is required"),
  houseNumber: z.string().optional().or(z.literal("")),
}).refine(
  (data) => {
    // If addressType is SameAsPermanent, no other validation needed
    if (data.addressType === "SameAsPermanent") {
      return true;
    }
    // For Permanent and Temporary, all fields required
    return (
      data.province &&
      data.district &&
      data.municipality &&
      data.wardNumber &&
      data.tole
    );
  },
  {
    message: "Address details are required",
    path: ["district"],
  }
);

// Array of addresses sent to backend
export const addressesSchema = z.array(addressSchema);

// ===== PARENT DETAIL DTO =====
export const parentsSchema = z.array(z.object({
  parentType: z.enum(["Father", "Mother", "Guardian"]),
  fullName: z.string().min(1, "Full name is required"),
  mobileNumber: z.string().min(1, "Mobile number is required"),
  occupation: z.string().optional(),
  designation: z.string().optional(),
  organization: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  annualFamilyIncome: z.string().optional(),
}));

// ===== ACADEMIC SESSION DTO =====
export const academicSessionSchema = z.object({
  academicYear: z.enum(["FirstYear", "SecondYear", "ThirdYear", "FourthYear"]),
  semester: z.enum(["FirstSemester", "SecondSemester", "ThirdSemester", "FourthSemester", "FifthSemester", "SixthSemester"]),
  section: z.string().optional().or(z.literal("")),
  rollNumber: z.string().optional().or(z.literal("")),
  status: z.enum(["Active", "OnHold", "Completed", "DroppedOut"]),
});

// ===== PROGRAM ENROLLMENT DTO =====
export const programEnrollmentSchema = z.object({
  faculty: z.enum(["Science", "Management", "Humanities", "Engineering", "Other"]),
  degreeProgram: z.enum(["BSc", "BBA", "BA", "BE", "Masters", "PlusTwo"]),
  enrollmentDate: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration Number is required"),
  academicSessions: z.array(academicSessionSchema),
});

// ===== ACADEMIC HISTORY DTO =====
export const academicHistorySchema = z.object({
  qualification: z.enum(["SLC", "Plus", "Bachelors", "Masters"]),
  board: z.string().min(1, "Board is required"),
  institution: z.string().min(1, "Institution is required"),
  passedYear: z.string().min(4, "Passed year is required"),
  divisionGPA: z.enum(["First", "Second", "Third", "GPA", "Other"]),
  marksheet: z.instanceof(File).optional(),
  provisional: z.instanceof(File).optional(),
  photo: z.instanceof(File).refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Photo must be less than 2MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Photo must be JPG or PNG"
  ),
  signature: z.instanceof(File).refine(
    (file) => file.size <= 1 * 1024 * 1024,
    "Signature must be less than 1MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Signature must be JPG or PNG"
  ),
  characterCertificate: z.instanceof(File).refine(
    (file) => file.size <= 2 * 1024 * 1024,
    "Character Certificate must be less than 2MB"
  ).refine(
    (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
    "Character Certificate must be JPG or PNG"
  ),
});

// ===== BANK DETAIL DTO =====
export const bankDetailsSchema = z.object({
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  branch: z.string().optional().or(z.literal("")),
});

// ===== SCHOLARSHIP DTO =====
export const scholarshipsSchema = z.object({
  feeCategory: z.enum(["Regular", "SelfFinanced", "Scholarship", "Quota"]),
  scholarshipType: z.string().optional().or(z.literal("")),
  scholarshipProvider: z.string().optional().or(z.literal("")),
  scholarshipAmount: z.string().optional().or(z.literal("")),
}).refine(
  (data) => {
    if (data.feeCategory !== "Scholarship" || data.scholarshipType === "None" || !data.scholarshipType) {
      return true;
    }
    return (
      data.scholarshipProvider &&
      data.scholarshipAmount
    );
  },
  {
    message: "Scholarship details are required when Scholarship fee category is selected",
    path: ["scholarshipProvider"],
  }
);

// ===== ACHIEVEMENT DTO =====
export const achievementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuingOrganization: z.string().optional().or(z.literal("")),
  yearReceived: z.string().optional().or(z.literal("")),
});

// ===== STUDENT EXTRA INFO DTO =====
export const studentExtraInfoSchema = z.object({
  extracurricularInterests: z.array(z.string()).optional(),
  otherInterest: z.string().optional().or(z.literal("")),
  hostellerStatus: z.string().optional().or(z.literal("")),
  transportation: z.string().optional().or(z.literal("")),
});

// ===== DECLARATION DTO =====
export const declarationSchema = z.object({
  isAgreed: z.boolean().default(false),
  dateOfApplication: z.string().min(1, "Date of Application is required"),
  place: z.string().optional().or(z.literal("")),
});

// ===== STUDENT FULL DTO =====
export const studentFullSchema = z.object({
  id: z.number().optional(),
  student: studentSchema,
  secondaryInfo: secondaryInfoSchema,
  ethnicity: ethnicitySchema,
  emergency: emergencySchema,
  disability: disabilitySchema,
  citizenship: citizenshipSchema,
  addresses: addressesSchema,
  parents: parentsSchema,
  programEnrollments: programEnrollmentSchema,
  academicHistories: z.array(academicHistorySchema).optional(),
  scholarships: scholarshipsSchema,
  bankDetails: bankDetailsSchema,
  achievements: z.array(achievementSchema).optional(),
  studentExtraInfos: studentExtraInfoSchema.optional(),
  declaration: declarationSchema,
});

// Flat structure returned by backend GET endpoints
export const studentFlatSchema = z.object({
  id: z.number(),
  imagePath: z.string().optional(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  placeOfBirth: z.string().optional(),
  email: z.string(),
  mobileNumber: z.string(),
  gender: z.string(),
});

export type StudentFull = z.infer<typeof studentFullSchema>;
export type StudentFlat = z.infer<typeof studentFlatSchema>;
