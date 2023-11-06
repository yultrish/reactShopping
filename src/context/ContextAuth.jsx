import { createContext, useState } from "react";

export const ContextAuth = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([""]);
  const [auth, setAuth] = useState();

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const info = {
    auth,
    setAuth,
    setCurrentUser,
    currentUser,
    login,
    logout,
  };

  return (
    <>
      <ContextAuth.Provider value={info}>{children}</ContextAuth.Provider>
    </>
  );
};
