import axios from "axios";

// Axios instance
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Refresh Token Function
const refreshToken = async () => {
  try {
    const { data } = await axios.post(
      `${
        process.env.REACT_APP_API_URL || "http://localhost:5000/api"
      }/auth/refresh`,
      {},
      { withCredentials: true }
    );
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (err) {
    console.error("Token refresh failed:", err);
    return null;
  }
};

// Add Authorization header
API.interceptors.request.use(async (req) => {
  let token = localStorage.getItem("accessToken");
  req.headers.Authorization = `Bearer ${token}`;

  return req;
});

// Handle Expired Tokens
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return API.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Lead Management APIs
export const fetchLeads = (queryParams = "") =>
  API.get(`/leads?${queryParams}`);
export const fetchLead = (id) => API.get(`/leads/${id}`);
export const createLead = (data) => API.post("/leads", data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);
