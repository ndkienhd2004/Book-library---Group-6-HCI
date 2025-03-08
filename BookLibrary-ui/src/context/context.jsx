import { createContext, useState, useEffect } from "react";
import {
  getAccessToken,
  setAccessToken,
  deleteAccessToken,
} from "../utils/auth";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: getAccessToken() });

  useEffect(() => {
    setAuth({ token: getAccessToken() });
  }, []);

  const login = (token) => {
    setAccessToken(token);
    setAuth({ token });
  };

  const logout = () => {
    deleteAccessToken();
    setAuth({ token: null });
  };

  return (
    <AppContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
