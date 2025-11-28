import axios from "axios";
import { StudentFull } from "../types/student";

// Base Axios instance
const api = axios.create({
  baseURL: "http://localhost:7019/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// POST: Submit student form
export const postStudentForm = async (data: StudentFull) => {
  try {
    const response = await api.post("/student", data);
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
    console.error("GET student by ID error:", error.response || error.message);
    throw error;
  }
};

export default api;
