import React from "react";
import { Navigate } from "react-router";

const LoginRoute = ({ children }) => {
  return sessionStorage.getItem("token") ? (
    <Navigate to="/my-projects" />
  ) : (
    children
  );
};

export default LoginRoute;
