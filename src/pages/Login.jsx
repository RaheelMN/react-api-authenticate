import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errors, login, setErrors } = useContext(AuthContext);

  const loginFunction = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const resetErrorValue = (element) => {
    const { name } = element;
    switch (name) {
      case "email":
        setErrors({ ...errors, email: "" });
        return;
      case "password":
        setErrors({ ...errors, password: "" });
        return;
    }
  };

  return (
    <div className="pt-10 bg-slate-50">
      <form
        onSubmit={loginFunction}
        className="max-w-md mx-auto p-4 mt-10 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          <div className="text-center text-red-950 font-bold ">Login</div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 text-sm font-medium block">
              Email
            </label>
            <input
              className="block border border-gray-300 text-gray-900 w-full p-2 rounded-md text-sm"
              onChange={(e) => {
                setEmail(e.target.value);
                resetErrorValue(e.target);
              }}
              type="email"
              name="email"
              id="email"
              value={email}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 text-sm font-medium block"
            >
              Password
            </label>
            <input
              className="block border border-gray-300 text-gray-900 w-full p-2 rounded-md text-sm"
              onChange={(e) => {
                setPassword(e.target.value);
                resetErrorValue(e.target);
              }}
              type="password"
              name="password"
              id="password"
              value={password}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-md py-1 px-3 w-1/2 rounded">
              Login
            </button>
          </div>
          <div className="mt-4">
            <div className="text-center text-gray-500 text-sm">
              <Link className="underline" to="/forgotpassword">
                Forgot Password?
              </Link>
            </div>
            <div className="text-center text-gray-500 text-sm mt-1 ">
              Not a memeber yet?{" "}
              <Link to="/Register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
