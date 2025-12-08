import axios from "axios";
import { StudentFull, StudentFlat } from "../types/student";

// Base Axios instance
const api = axios.create({
  baseURL: "https://localhost:7190/api",
});

// Helper function to convert data to FormData
const convertToFormData = (data: any, formData = new FormData(), parentKey = ""): FormData => {
  if (data === null || data === undefined) {
    return formData;
  }

  if (data instanceof File) {
    formData.append(parentKey, data);
  } else if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const key = `${parentKey}[${index}]`;
      convertToFormData(item, formData, key);
    });
  } else if (typeof data === "object") {
    Object.keys(data).forEach((key) => {
      const value = data[key];
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
    const formData = convertToFormData(data);
    const response = await api.post("/student", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("POST student form error:", error.response || error.message);
    throw error;
  }
};

// GET: Fetch student data by ID
export const getStudentById = async (id: number) => {
  try {
    const response = await api.get(`/student/${id}`);
    return response.data as StudentFlat;
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
