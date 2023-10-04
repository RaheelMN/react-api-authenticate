import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <>
      <nav className=" bg-indigo-900 text-white px-2 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <a href="https://shopnow77.rf.gd" target="_blank">
            ShopNow
          </a>
          <div>
            <ul className=" flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium">
              <li>
                <Link to="/" className="block rounded py-2 pr-4 pl-3">
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="block rounded py-2 pr-4 pl-3"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthLayout;
