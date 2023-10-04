import { useContext, createContext, useState, useEffect } from "react";
import axios from "../components/api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    getUser();
  },[])

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const getUser = async () => {
    try {      
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (error) {
      if(error.response.status===401){
        console.log(error.response.data.message);
      }
    }
  };

  const login = async ({ ...data}) => {
    await csrf();
    try {
      await axios.post("/login", data);
      await getUser()
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null)
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };

  const register = async ({name,email,password,password_confirmation}) => {
    await csrf()
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation
      });
      await getUser()
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };  

  return <AuthContext.Provider value={{user,errors,csrf,setErrors,getUser,login,logout,register}}>{children}</AuthContext.Provider>;
};
export default AuthContext;
