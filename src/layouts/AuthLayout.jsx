import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <>
      <nav className=" bg-indigo-900 text-white px-2 py-2.5">
        <div className="container mx-auto flex items-center justify-between">
          <ul>
            <li>
              <Link to="/" className="block rounded py-2 pr-4 pl-3">
                Home
              </Link>
            </li>
          </ul>
          <div>
            <ul className="flex items-center space-x-4"
            //  className=" flex flex-col rounded-lg p-4 md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium"
             >
              <li>Welcome {` ${user.name}!`}</li>
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
