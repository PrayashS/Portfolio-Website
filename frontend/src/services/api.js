import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Profile API
export const profileAPI = {
  get: () => api.get("/profile"),
  update: (data) => api.put("/profile", data),
  login: (password) => api.post("/profile/login", { password }),
  uploadResume: (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    return api.post("/profile/upload-resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteResume: () => api.delete("/profile/delete-resume"),
};

// Experience API
export const experienceAPI = {
  getAll: () => api.get("/experience"),
  create: (data) => api.post("/experience", data),
  update: (id, data) => api.put(`/experience/${id}`, data),
  delete: (id) => api.delete(`/experience/${id}`),
};

// Project API
export const projectAPI = {
  getAll: () => api.get("/projects"),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Skill API
export const skillAPI = {
  getAll: () => api.get("/skills"),
  create: (data) => api.post("/skills", data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`),
};

// Contact API (NEW)
export const contactAPI = {
  send: (data) => api.post("/contact/send", data),
};

export default api;
