import axios from "axios";

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (typeof window !== "undefined" && window.location) {
    const host = window.location.hostname;
    if (host && host !== "localhost" && host !== "127.0.0.1") {
      return `http://${host}:8000`;
    }
  }
  return "http://127.0.0.1:8000";
};

export const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically inject Authorization token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (email, password) => {
    const res = await api.post("/user/login", { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    return res.data;
  },
  register: async (name, email, password) => {
    const res = await api.post("/user/register", { name, email, password });
    return res.data;
  },
  isAuth: async () => {
    const res = await api.get("/user/is_auth");
    return res.data;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
};

let _pendingAnalysis = null;

export const setPendingAnalysis = (data) => {
  _pendingAnalysis = data;
};

export const getPendingAnalysis = () => {
  return _pendingAnalysis;
};

export const resumeService = {
  getSample: async () => {
    const res = await api.get("/resume/sample");
    return res.data;
  },
  analyzeJSON: async (payload) => {
    const res = await api.post("/resume/analyze", payload);
    return res.data;
  },
  analyzeFile: async (formData) => {
    const res = await axios.post(`${API_BASE_URL}/resume/analyze-file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(localStorage.getItem("token")
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
          : {}),
      },
    });
    return res.data;
  },
  getHistory: async () => {
    const res = await api.get("/resume/history");
    return res.data;
  },
  getAnalysisById: async (id) => {
    const res = await api.get(`/resume/history/${id}`);
    return res.data;
  },
  deleteAnalysis: async (id) => {
    const res = await api.delete(`/resume/history/${id}`);
    return res.data;
  },
  clearAllHistory: async () => {
    const res = await api.delete("/resume/history");
    return res.data;
  },
};

export default api;
