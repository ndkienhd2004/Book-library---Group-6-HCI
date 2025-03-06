import http from "../utils/http";

export const login = async (form) => {
  return await http.post("/auth/login", form);
};

export const register = async (form) => {
  return await http.post("/auth/register", form);
};

export const logout = async () => {
  return await http.get("/auth/logout");
};
