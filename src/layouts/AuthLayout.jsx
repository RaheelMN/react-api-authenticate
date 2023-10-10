import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, Navigate, Outlet } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "../components/api/axios";

const AuthLayout = () => {
  const { user, logout, setProducts, key, setKey, products, searchProducts } =
    useContext(AuthContext);

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
          <div className="search-bar border-2 rounded-xl flex gap-2 pl-2 items-center bg-slate-100 ">
            <AiOutlineSearch className="text-gray-700" />
            <input
              onChange={(e) => {
                searchProducts(e.target.value,1);
                setKey(e.target.value);
              }}
              className="search-input"
              type="text"
              name=""
              id=""
              placeholder="Search product"
              value={key}
            />
          </div>
          <div>
            <ul
              className="flex items-center space-x-4"
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
