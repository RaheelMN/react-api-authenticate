import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../components/api/axios";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const csrf = ()=> axios.get('/sanctum/csrf-cookie')

  useEffect(() => {
    setErrors([]);
  }, []);

  const resetErrorValue = (element) => {
    const { name } = element;
    switch (name) {
      case "name":
        setErrors({ ...errors, name: "" });
        return;
      case "email":
        setErrors({ ...errors, email: "" });
        return;
      case "password":
        setErrors({ ...errors, password: "" });
        return;
    }
  };

  const registerFunction = async (e) => {
    e.preventDefault();
    await csrf()
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation: cpassword,
      });
      setName("");
      setEmail("");
      setPassword("");
      setCpassword("");
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="pt-10 bg-slate-50">
      <form
        onSubmit={registerFunction}
        className="max-w-md mx-auto p-4 mt-10 bg-white shadow-md rounded-sm"
      >
        <div 
        className="space-y-6"
        >
          <div className="text-center text-red-950 font-bold ">Register</div>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 text-sm font-medium block">
              Name
            </label>
            <input
              className="block border border-gray-300 text-gray-900 w-full p-2 rounded-md text-sm"
              onChange={(e) => {
                setName(e.target.value);
                resetErrorValue(e.target);
              }}
              type="text"
              name="name"
              id="name"
              value={name}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
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
            {errors.password &&
              (errors.password.length > 1 ? (
                <>
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
                <p className="text-red-500 text-sm mt-1">
                {errors.password[1]}
              </p>                
                </>
              ) : (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password[0]}
                </p>
              ))}
          </div>
          <div className="mb-4">
            <label
              htmlFor="cpassword"
              className="mb-2 text-sm font-medium block"
            >
              Confirm Password
            </label>
            <input
              className="block border border-gray-300 text-gray-900 w-full p-2 rounded-md text-sm"
              onChange={(e) => {
                setCpassword(e.target.value);
                resetErrorValue(e.target);
              }}
              type="password"
              name="cpassword"
              id="cpassword"
              value={cpassword}
              required
            />
          </div>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-md py-1 px-3 w-1/2 rounded">
              Register
            </button>
          </div>
          <div className="mt-4">
            <div className="text-center text-gray-500 text-sm ">
              Already a member?{" "}
              <Link to="/Login" className="underline">
                Sign In
              </Link>
            </div>
          </div>      
        </div>
      </form>
    </div>
  );
};
