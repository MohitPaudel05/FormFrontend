// Blood Groups
export const bloodGroupOptions = [
  { value: "APositive", label: "A+" },
  { value: "ANegative", label: "A-" },
  { value: "BPositive", label: "B+" },
  { value: "BNegative", label: "B-" },
  { value: "OPositive", label: "O+" },
  { value: "ONegative", label: "O-" },
  { value: "ABPositive", label: "AB+" },
  { value: "ABNegative", label: "AB-" },
];

// Marital Status
export const maritalStatusOptions = ["Single", "Married", "Divorced"];

// Religion
export const religionOptions = ["Hindu", "Buddhist", "Muslim", "Christian", "Kirat", "Other"];

// Ethnicity Group
export const ethnicityGroupOptions = [
  "Dalit",
  "Janajati",
  "Madhesi",
  "Brahmin",
  "Chhetri",
  "Other"
];

// Ethnicity by Group
export const ethnicityByGroup: Record<string, string[]> = {
  Dalit: ["Kami", "Damai", "Sarki", "Badi", "Gaine", "Chamar", "Dusadh", "Musahar"],
  Janajati: ["Magar", "Gurung", "Tamang", "Rai", "Limbu", "Sherpa", "Tharu", "Newar", "Sunuwar", "Chepang", "Bhote", "Thakali", "Kumal"],
  Madhesi: ["Yadav", "Teli", "Koiri", "Kurmi", "Hajam", "Kanu", "Mallah", "Halwai", "Lohar"],
  Brahmin: ["Brahmin", "Thakuri"],
  Chhetri: ["Chhetri"],
  Other: ["Muslim", "Punjabi", "Marwadi", "Other"]
};

// Ethnicity
export const ethnicityOptions = [
  "Kami", "Damai", "Sarki", "Badi", "Gaine", "Chamar", "Dusadh", "Musahar",
  "Magar", "Gurung", "Tamang", "Rai", "Limbu", "Sherpa", "Tharu", "Newar",
  "Sunuwar", "Chepang", "Bhote", "Thakali", "Kumal",
  "Yadav", "Teli", "Koiri", "Kurmi", "Hajam", "Kanu", "Mallah", "Halwai", "Lohar",
  "Brahmin", "Chhetri", "Thakuri",
  "Muslim", "Punjabi", "Marwadi", "Other"
];

// Gender
export const genderOptions = ["Male", "Female", "Other"];

// Disability
export const disabilityOptions = ["None", "Physical", "Visual", "Hearing", "Other"];

// Province
export const provinceOptions = [
  { value: "Province1", label: "Province 1" },
  { value: "Province2", label: "Province 2" },
  { value: "Bagmati", label: "Bagmati" },
  { value: "Gandaki", label: "Gandaki" },
  { value: "Lumbini", label: "Lumbini" },
  { value: "Karnali", label: "Karnali" },
  { value: "Sudurpashchim", label: "Sudurpashchim" },
];

// Faculty
export const facultyOptions = ["Science", "Management", "Humanities", "Engineering", "Other"];

// Degree Program
export const degreeProgramOptions = ["BSc", "BBA", "BA", "BE", "Masters", "PlusTwo"];

// Academic Year
export const academicYearOptions = [
  { value: "FirstYear", label: "First Year" },
  { value: "SecondYear", label: "Second Year" },
  { value: "ThirdYear", label: "Third Year" },
  { value: "FourthYear", label: "Fourth Year" },
];

// Semester
export const semesterOptions = [
  { value: "FirstSemester", label: "First Semester" },
  { value: "SecondSemester", label: "Second Semester" },
  { value: "ThirdSemester", label: "Third Semester" },
  { value: "FourthSemester", label: "Fourth Semester" },
  { value: "FifthSemester", label: "Fifth Semester" },
  { value: "SixthSemester", label: "Sixth Semester" },
];

// Academic Status
export const academicStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "OnHold", label: "On Hold" },
  { value: "Completed", label: "Completed" },
  { value: "DroppedOut", label: "Dropped Out" },
];

// Qualification Type
export const qualificationTypeOptions = [
  { value: "SLC", label: "SLC/SEE" },
  { value: "plus", label: "+2" },
  { value: "Bachelors", label: "Bachelors" },
  { value: "Masters", label: "Masters" },
];

// Division/GPA
export const divisionGPAOptions = ["First", "Second", "Third", "GPA", "Other"];

// Fee Category
export const feeCategoryOptions = [
  { value: "Regular", label: "Regular" },
  { value: "SelfFinanced", label: "Self-Financed" },
  { value: "Scholarship", label: "Scholarship" },
  { value: "Quota", label: "Quota" },
];

// Scholarship Type
export const scholarshipTypeOptions = [
  { value: "None", label: "None" },
  { value: "Government", label: "Government" },
  { value: "Institutional", label: "Institutional" },
  { value: "Private", label: "Private" },
];

// Annual Income
export const annualIncomeOptions = [
  { value: "LessThan5Lakh", label: "<5 Lakh" },
  { value: "From5To10Lakh", label: "5-10 Lakh" },
  { value: "From10To20Lakh", label: "10-20 Lakh" },
  { value: "MoreThan20Lakh", label: ">20 Lakh" },
];

// Interests
export const interestOptions = ["Sports", "Music", "Debate", "Coding", "Volunteering", "Arts", "Other"];

// Hostel/Residency Type
export const residencyTypeOptions = [
  { value: "Hosteller", label: "Hosteller" },
  { value: "DayScholar", label: "Day Scholar" },
];

// Transportation Method
export const transportationMethodOptions = [
  { value: "Walk", label: "Walk" },
  { value: "Bicycle", label: "Bicycle" },
  { value: "Bus", label: "Bus" },
  { value: "PrivateVehicle", label: "Private Vehicle" },
];

// Parent Type
export const parentTypeOptions = ["Father", "Mother", "Guardian"];

// Emergency Contact Relation
export const emergencyContactRelationOptions = ["Father", "Mother", "Guardian"];
