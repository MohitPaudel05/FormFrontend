import axios from "axios";
import { StudentFull, StudentFlat } from "../types/student";


const api = axios.create({
  baseURL: "https://localhost:7190/api",
});

// Helper function to convert data to FormData
const convertToFormData = (data: any, formData = new FormData(), parentKey = ""): FormData => {
  if (data === null || data === undefined) {
    // Special case: for citizenship photos, include them even if null/undefined
    // This prevents ASP.NET model binding from creating empty arrays
    if (parentKey.endsWith('.citizenshipFrontPhoto') || parentKey.endsWith('.citizenshipBackPhoto')) {
      formData.append(parentKey, ''); // Add empty string so field is present
      console.log(`📝 Including ${parentKey} as empty (prevents validation error)`);
      return formData;
    }
    // ✅ Skip null/undefined values for other fields
    return formData;
  }

  if (data instanceof File) {
    formData.append(parentKey, data);
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      // ✅ Skip null/undefined array items
      if (item === null || item === undefined) {
        return;
      }
      const key = `${parentKey}[${index}]`;
      convertToFormData(item, formData, key);
    });
  } else if (typeof data === "object") {
    Object.keys(data).forEach((key) => {
      const value = data[key];
      // ✅ Skip null/undefined values - don't add them to FormData
      if (value === null || value === undefined) {
        console.log(`⏭️ Skipping ${parentKey ? parentKey + '.' : ''}${key} (value is ${value})`);
        return; // Skip this field
      }
      
      // ✅ Skip empty strings for Path fields - let backend use defaults
      if (typeof value === 'string' && value === '' && key.endsWith('Path')) {
        console.log(`⏭️ Skipping ${parentKey ? parentKey + '.' : ''}${key} (empty Path field)`);
        return; // Skip empty Path fields
      }
      
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      convertToFormData(value, formData, fullKey);
    });
  } else {
    formData.append(parentKey, String(data));
  }

  return formData;
};

// POST: Submit student form
export const postStudentForm = async (data: StudentFull) => {
  try {
    // Ensure academic histories have the required Path fields (as empty strings for new submissions)
    const processedData = {
      ...data,
      academicHistories: (data.academicHistories || []).map((history: any) => ({
        qualification: history.qualification || "",
        board: history.board || "",
        institution: history.institution || "",
        passedYear: history.passedYear || "",
        divisionGPA: history.divisionGPA || "",
        // Include Path fields as empty strings for new submissions
        photoPath: history.photoPath || "",
        signaturePath: history.signaturePath || "",
        characterCertificatePath: history.characterCertificatePath || "",
        marksheetPath: history.marksheetPath || "",
        provisionalPath: history.provisionalPath || "",
        // Include File objects if they exist
        ...(history.photo instanceof File && { photo: history.photo }),
        ...(history.signature instanceof File && { signature: history.signature }),
        ...(history.characterCertificate instanceof File && { characterCertificate: history.characterCertificate }),
        ...(history.marksheet instanceof File && { marksheet: history.marksheet }),
        ...(history.provisional instanceof File && { provisional: history.provisional }),
      }))
    };

    const formData = convertToFormData(processedData);
    
    // Log all FormData entries to see what's being sent
    console.log("📋 FormData entries being sent:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    const response = await api.post("/student", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("🔴 POST student form error:");
    console.error("  Status:", error.response?.status);
    console.error("  Full error data:", error.response?.data);
    if (error.response?.data?.errors) {
      console.error("  Detailed validation errors:", JSON.stringify(error.response.data.errors, null, 2));
    }
    console.error("  Message:", error.message);
    throw error;
  }
};

// GET: Fetch student data by ID
export const getStudentById = async (id: number) => {
  try {
    const response = await api.get(`/student/${id}`);
    // Return as any to handle nested objects (StudentFullDto from backend)
    return response.data as any;
  } catch (error: any) {
    console.error("GET student by ID error:", error.response || error.message)
    throw error;
  }
};

// GET: Fetch all students
export const getAllStudents = async () => {
  try {
    const response = await api.get("/student");
    return response.data as StudentFlat[];
  } catch (error: any) {
    console.error("GET all students error:", error.response || error.message);
    throw error;
  }
};

// PUT: Update student by ID
export const updateStudent = async (id: number, data: StudentFull) => {
  try {
    const formData = convertToFormData(data);
    
    // Log what keys are in FormData for citizenship
    console.log("📋 FormData keys for citizenship:");
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('citizenship')) {
        console.log(`  ${key}: ${value instanceof File ? `File(${(value as File).name})` : value}`);
      }
    }
    
    const response = await api.put(`/student/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data as StudentFlat;
  } catch (error: any) {
    console.error("🔴 PUT student error:");
    console.error("  Status:", error.response?.status);
    console.error("  Full error data:", error.response?.data);
    if (error.response?.data?.errors) {
      console.error("  Detailed validation errors:", JSON.stringify(error.response.data.errors, null, 2));
    }
    console.error("  Message:", error.message);
    throw error;
  }
};

// DELETE: Delete student by ID
export const deleteStudent = async (id: number) => {
  try {
    const numId = Number(id);
    console.log("Attempting to delete student with ID:", numId, "Type:", typeof numId);
    
    if (!numId || numId <= 0 || isNaN(numId)) {
      throw new Error(`Invalid student ID: ${id}`);
    }
    const response = await api.delete(`/student/${numId}`);
    // 204 No Content is success for DELETE, as well as 200 OK
    return response.status === 204 || response.status === 200;
  } catch (error: any) {
    console.error("DELETE student error:", error);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
};

export default api;
