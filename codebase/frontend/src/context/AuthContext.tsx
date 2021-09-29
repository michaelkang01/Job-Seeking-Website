import React from "react";
import { useState } from "react";
import "tailwindcss/tailwind.css";

const AuthContext = React.createContext({
  authToken: "",
  authData: "",
  setAuthToken: (val: string) => {},
  setAuthData: (val: string) => {},
  signOut: () => {},
  updateData: (val: UpdateData) => {},
});

type AuthProps = {
  children: JSX.Element;
};

export type UpdateData = {
  authToken: string;
  authData: string;
};

const AuthProvider = ({ children }: AuthProps) => {
  const [authToken, setAuthToken] = useState("");
  const [authData, setAuthData] = useState("");

  const signOut = () => {
    setAuthToken("");
    setAuthData("");
    localStorage.setItem("authToken", "");
    localStorage.setItem("authData", "");
  };

  const updateData = ({ authToken, authData }: UpdateData) => {
    setAuthToken(authToken);
    setAuthData(authData);
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("authData", authData);
  };

  return (
    <AuthContext.Provider
      value={{
        authToken: authToken,
        authData: authData,
        setAuthToken,
        setAuthData,
        signOut,
        updateData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
