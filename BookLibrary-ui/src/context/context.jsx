import { createContext, useState, useEffect, use } from "react";
import {
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
  setUsername,
  deleteUsername,
  getUsername,
} from "../utils/auth";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: getAccessToken() });
  const [name, setName] = useState(getUsername());
  useEffect(() => {
    setAuth({ token: getAccessToken() });
  }, []);
  useEffect(() => {
    setName(getUsername());
  }, []);

  const login = (data) => {
    setAccessToken(data.token);
    setAuth({ token: data.token });
    setName(data.user.fullname);
    setUsername(data.user.fullname);
  };

  const logout = () => {
    deleteAccessToken();
    deleteUsername();
    setAuth({ token: null });
  };

  return (
    <AppContext.Provider value={{ auth, setAuth, login, logout, name }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
