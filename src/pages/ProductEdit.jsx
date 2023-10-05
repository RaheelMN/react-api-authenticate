import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../components/api/axios";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const ProductEdit = () => {
  const { id } = useParams();
  const [pname, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [price, setprice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [imageFile, setimageFile] = useState("");
  const [nameErr, setNameErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [priceErr, setPriceErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const { getProductsList } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProductAPI();
  }, []);

  const getProductAPI = async () => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      setname(response.data.name);
      setdesc(response.data.description);
      setImagePath(response.data.file_path);
      setprice(response.data.price);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    //Initialize error message
    let errFlag = false;

    //check name input field
    if (!pname) {
      setNameErr("Enter product name");
      errFlag = true;
    } else {
      setNameErr("");
    }

    //check description input field
    if (!desc) {
      errFlag = true;
      setDescErr("Enter description");
    } else {
      setDescErr("");
    }

    //check price input field
    if (!price) {
      errFlag = true;
      setPriceErr("Enter price");
    } else {
      setPriceErr("");
    }

    if (!errFlag) {
      const formData = new FormData();
      formData.append("id", id);
      if (imageFile != "") {
        formData.append("image", imageFile);
      }
      formData.append("name", pname);
      formData.append("_method", "PUT");
      formData.append("description", desc);
      formData.append("price", price);

      try {
        await axios.post(`/api/products/${id}`, formData);
        toast.success('Product successfully updated.');
        getProductsList();
        navigate("/");
      } catch (error) {
        if (error.response.status === 422) {
          const err = error.response.data.errors;
          if (err.name) {
            setNameErr(err.name[0]);
          }
          if (err.description) {
            setDescErr(err.description[0]);
          }
          if (err.image) {
            setImageErr(err.image[0]);
          }
          if (err.price) {
            setPriceErr(err.price[0]);
          }
          console.log(err);
        }
      }
    }
  };

  return (
    <div className="max-w-xl m-auto mt-8">
      <form onSubmit={updateProduct}>
        <h3 className="pt-3 text-center font-bold">Update Product</h3>
        <div className="flex flex-col gap-6 mt-4">
          <div className="pt-3">
            <label className="text-gray-900 block" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border-2 border-gray-400 rounded-md pl-2 py-1 mt-1 bg-white"
              onChange={(e) => {
                setname(e.target.value);
                setNameErr("");
              }}
              type="text"
              value={pname}
              name="name"
              id="name"
            />
            <p className="errorMsg">{nameErr}</p>
          </div>
          <div className="">
            <div>Image</div>
            <img
              className="mt-1"
              name="image"
              id="image"
              style={{ height: "200px", width: "100%", objectFit: "contain" }}
              src={`http://localhost:8000/${imagePath}`}
              alt="image"
            />
          </div>
          <div className="">
            <label className="text-gray-900 block" htmlFor="imageFile">
              Choose Image
            </label>
            <input
              className="w-full mt-1"
              type="file"
              onChange={(e) => {
                setimageFile(e.target.files[0]);
                setImageErr("");
              }}
              name="imageFile"
              id="imageFile"
            />
            <p className="errorMsg">{imageErr}</p>
          </div>
          <div className="">
            <label className="text-gray-900 block" htmlFor="desc">
              Description
            </label>
            <input
              className="w-full border-2 border-gray-400 rounded-md pl-2 py-1 mt-1 bg-white"
              onChange={(e) => {
                setdesc(e.target.value);
                setDescErr("");
              }}
              value={desc}
              type="text"
              name="desc"
              id="desc"
            />
            <p className="errorMsg">{descErr}</p>
          </div>
          <div className="">
            <label className="text-gray-900 block" htmlFor="price">
              Price
            </label>
            <input
              className="w-full border-2 border-gray-400 rounded-md pl-2 py-1 mt-1 bg-white"
              onChange={(e) => {
                setprice(e.target.value);
                setPriceErr("");
              }}
              value={price}
              type="number"
              name="price"
              id="price"
            />
            <p className="errorMsg">{priceErr}</p>
          </div>
          <div className="pt-3 text-center">
            <button className="text-white bg-blue-800 rounded-md px-5 py-1 border-none">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
