import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([""]);
  const [token, setToken] = useState([""]);
  const [auth, setAuth] = useState(false);

  const login = async (user) => {
    if (user.id) {
      const randomNum =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setToken(randomNum);
      localStorage.setItem("token", randomNum);
      let User = JSON.stringify(user);
      setCurrentUser(User);
      setAuth(true);
      localStorage.setItem("user", User);
      return;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken && localToken.length > 0) {
      setAuth(true);
    } else {
      setAuth(false);
      console.log("user not authenticated");
    }
  }, [currentUser, setToken]);

  const data = {
    auth,
    setAuth,
    setCurrentUser,
    currentUser,
    token,
    setToken,
    login,
    logout,
  };

  return (
    <>
      <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    </>
  );
};
