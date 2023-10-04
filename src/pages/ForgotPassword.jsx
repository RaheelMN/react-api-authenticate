import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../components/api/axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [status, setStatus] = useState("");
  const { csrf } = useContext(AuthContext);

  const submitEmail = async (e) => {
    e.preventDefault();
    setErrors("");
    setStatus("");
    await csrf();
    try {
      const response=await axios.post('/forgot-password',{email});
      setStatus(response.data.status)
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
        onSubmit={submitEmail}
        className="max-w-md mx-auto p-4 mt-10 bg-white shadow-md rounded-sm"
      >
        <div className="space-y-6">
            {status && <div className="bg-green-800 rounded-md text-white px-3">{status}</div>}
          <div className="text-center text-red-950 font-bold ">
            Password Retrival
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 text-sm font-medium block">
              Email
            </label>
            <input
              className="block border border-gray-300 text-gray-900 w-full p-2 rounded-md text-sm"
              onChange={(e) => {
                setEmail(e.target.value);
                resetErrorValue();
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

export default ForgotPassword;
