import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const GuestLayout = () => {
  const { user } = useContext(AuthContext);
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestLayout;
