import api from "./api";

export const login = (payload) => api.post("/auth/login", payload);
export const register = (payload) => api.post("/auth/register", payload);
export const getSecurityQuestion = (email) =>
  api.post("/auth/forgot-password/question", { email });
export const verifySecurityAnswer = (email, securityAnswer) =>
  api.post("/auth/forgot-password/verify", { email, securityAnswer });
export const resetPassword = (payload) =>
  api.post("/auth/forgot-password/reset", payload);
export const changePassword = (payload) =>
  api.put("/auth/change-password", payload);