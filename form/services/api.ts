import axios from "axios";
import { StudentFull } from "../types/student";

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
    return response.data as StudentFull;
  } catch (error: any) {
    console.error("GET student by ID error:", error.response || error.message)
    throw error;
  }
};

export default api;
