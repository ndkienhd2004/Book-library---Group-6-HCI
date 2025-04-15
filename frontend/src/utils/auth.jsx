export const setAccessToken = (token) => {
  localStorage.setItem("accessToken", token);
};
export const getAccessToken = () => {
  return localStorage.getItem("accessToken") || "";
};

export const deleteAccessToken = () => {
  localStorage.removeItem("accessToken");
};
export const setUsername = (token) => {
  localStorage.setItem("username", token);
};
export const getUsername = () => {
  return localStorage.getItem("username") || "";
};

export const deleteUsername = () => {
  localStorage.removeItem("username");
};

export const setUserImage = (img) => {
  localStorage.setItem("userImage", img);
};
export const getUserImage = () => {
  return localStorage.getItem("userImage") || "";
};
export const deleteUserImage = () => {
  localStorage.removeItem("userImage");
};
