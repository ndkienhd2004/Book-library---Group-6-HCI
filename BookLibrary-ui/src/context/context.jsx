import { createContext, useState, useEffect } from "react";
import {
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  setUsername,
  deleteUsername,
  getUsername,
  getUserImage,
  setUserImage,
  deleteUserImage,
} from "../utils/auth";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: getAccessToken() });
  const [name, setName] = useState(getUsername());
  const [userImage, setUserImageState] = useState(getUserImage());

  useEffect(() => {
    setAuth({ token: getAccessToken() });
    setName(getUsername());
    setUserImageState(getUserImage());
  }, []);

  const login = (data) => {
    setAccessToken(data.token);
    setAuth({ token: data.token });

    setUsername(data.user.fullname);
    setName(data.user.fullname);

    setUserImage(data.user.avatar);
    setUserImageState(data.user.avatar);
  };

  const logout = () => {
    deleteAccessToken();
    deleteUsername();
    deleteUserImage();
    setAuth({ token: null });
    setName("");
    setUserImageState("");
  };

  return (
    <AppContext.Provider
      value={{ auth, setAuth, login, logout, name, userImage }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
