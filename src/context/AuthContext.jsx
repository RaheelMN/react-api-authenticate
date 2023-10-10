import { useContext, createContext, useState, useEffect } from "react";
import axios from "../components/api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalproducts, setTotalProducts] = useState([]);
  const [key, setKey] = useState("");
  const [isData,setIsData]=useState(false)
  const [current_page,setCurrentPage]=useState('')
  const [last_page,setLastPage]=useState('')
  const [per_page,setper_page]=useState('')
  const [total,settotal_page]=useState('')
  const [isSearch,setIsSearch]=useState(false)
  const [searchTerm,setSearchTerm]=useState('')
  useEffect(() => {
    getUser();
  }, []);

  const csrf = () => axios.get("/sanctum/csrf-cookie");
  const getUser = async () => {
    try {
      const { data } = await axios.get("/api/user");
      setUser(data);
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error.response.data.message);
      }
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    try {
      await axios.post("/login", data);
      await getUser();
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
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const register = async ({ name, email, password, password_confirmation }) => {
    await csrf();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      await getUser();
      navigate("/");
    } catch (error) {
      if (error.response.status === 422) {
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      }
    }
  };


  const getProductsList = async (pagenumber) => {
    setIsSearch(false)
    try {
      const response = await axios.get(`/api/products?page=${pagenumber}`);
      if (response.data.data) {
        const page = response.data
        setCurrentPage(page.current_page)
        setLastPage(page.last_page)
        settotal_page(page.total)
        setper_page(page.per_page)
        setProducts(response.data.data);
        setTotalProducts(response.data.data)
        setIsData(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchProducts = async (searchTerm,pagenumber) => {
    setIsSearch(true)
    if (searchTerm !== "") {
      setSearchTerm(searchTerm)
      try {
        const response = await axios.get(`/api/searchproducts/${searchTerm}?page=${pagenumber}`);
        // console.log(response.data)
        // console.log('length',response.data.data.length)
        if (response.data.data.length > 0) {
          // setProducts(response.data);
          const page = response.data
          console.log(page)
          setCurrentPage(page.current_page)
          setLastPage(page.last_page)
          settotal_page(page.total)
          setper_page(page.per_page)
          setProducts(response.data.data);
          // setTotalProducts(response.data.data)          
        }else{
          setIsData(false)
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      // setProducts([...totalproducts])
      getProductsList(1)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        csrf,
        setErrors,
        getUser,
        login,
        logout,
        register,
        getProductsList,
        key,
        setKey,
        setProducts,
        products,
        searchProducts,
        isData,
        current_page,
        last_page,
        per_page,
        total,
        isSearch,
        searchTerm,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
