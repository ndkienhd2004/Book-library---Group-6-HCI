import http from "../utils/http";

export const login = async (email, password) => {
  return await http.post("/auth/login", { email, password });
};

export const register = async (email, password) => {
  return await http.post("/auth/register", { email, password });
};

export const logout = async () => {
  return await http.get("/auth/logout");
};
