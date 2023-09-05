"use client";
import React, { createContext } from "react";

export const AuthContext = createContext(null);
const AuthProvider = ({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) => {
  return (
    <>
      <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
