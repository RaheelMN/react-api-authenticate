import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../components/api/axios";
import { Link, useParams, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [searchParams] = useSearchParams();
  const { csrf } = useContext(AuthContext);
  const { token } = useParams();

  useEffect(() => {
    setEmail(searchParams.get("email"));
    console.log("token: ", token, " email: ", email);
  });
  const resetEmail = async (e) => {
    e.preventDefault();
    setErrors("");
    setStatus("");
    await csrf();
    try {
      const response = await axios.post("/reset-password", { 
        email,
        token,
        password,
        password_confirmation });
      setStatus(response.data.status);
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };

  const resetErrorValue = () => {
    setErrors({ ...errors, email: "" });
  };

  return (
    <div className="pt-10 bg-slate-50">
      <form
        onSubmit={resetEmail}
        className="max-w-md mx-auto p-4 mt-10 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
          {status && (
            <>
            <div className="bg-green-800 rounded-md text-white px-3">
              {status}
            </div>
            <div className="mt-1 text-blue-500 text-sm"> Click to{" "} 
                <Link to="/login" className="underline">
                 login
                </Link>
            </div>
            </>
          )}
          <div className="text-center text-red-950 font-bold ">
            Reset Password
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
                resetErrorValue();
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
                setPasswordConfirmation(e.target.value);
                resetErrorValue();
              }}
              type="password"
              name="cpassword"
              id="cpassword"
              value={password_confirmation}
              required
            />
          </div>
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-md py-1 px-3 w-1/2 rounded">
              Submit
            </button>
          </div>
          <div className="mt-4">
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

export default ResetPassword;
