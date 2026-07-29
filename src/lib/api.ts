import axios from "axios";
import { clearAuthSession, getAuthToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Déconnexion automatique si le token est invalide/expiré
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
