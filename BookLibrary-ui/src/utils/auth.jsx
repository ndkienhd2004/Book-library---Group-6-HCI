export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};
export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || "";
};

export const deleteAccessToken = () => {
  localStorage.removeItem("accessToken");
};
