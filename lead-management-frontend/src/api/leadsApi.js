import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Ensure the backend is running on this base URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const registerUser = (data) => API.post("/auth/register", data);
export const fetchLeads = (queryParams) => API.get(`/leads?${queryParams}`);
export const createLead = (leadData) => API.post("/leads", leadData);
export const updateLead = (id, leadData) => API.put(`/leads/${id}`, leadData);
export const deleteLead = (id) => API.delete(`/leads/${id}`);
