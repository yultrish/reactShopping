import { createContext, useState } from "react";

export const ContextAuth = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([""]);
  const [auth, setAuth] = useState(false);

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

// export default Context
