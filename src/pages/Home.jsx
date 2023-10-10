import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import axios from "../components/api/axios";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {
  const {
    user,
    products,
    getProductsList,
    isData,
    current_page,
    last_page,
    per_page,
    data,
    total,
    isSearch,
    searchTerm,
    searchProducts
  } = useContext(AuthContext);
  const url = "http://localhost:8000/";
  const pages = Array(last_page);
  const page_start = (current_page - 1) * per_page;
  pages.fill(1);
  // console.log(pages);

  useEffect(() => {
    getProductsList(1);
  }, []);

  const productDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Product successfully deleted.");
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const hello = (i) => {
    alert("hello: " + i);
  };
  return (
    <div className="w-[80%] m-auto mt-10">
      <div className="relative overflow-x-auto">
        {isData ? (
          <>
            <div className="flex justify-end">
              <Link to="/products/addproduct">
                <button className="text-white bg-blue-800 rounded-md px-5 py-1 border-none">
                  Add Product
                </button>
              </Link>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" colSpan={2} className="px-6 py-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0
                  ? products.map((product, i) => (
                      <tr
                        key={product.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {page_start+i + 1}
                        </th>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">{product.description}</td>
                        <td className="px-6 py-4">{product.price}</td>
                        <td className="px-6 py-4">
                          <img
                            style={{
                              height: "60px",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            src={url + product.file_path}
                            alt="image"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <Link to={`/products/${product.id}/edit`}>
                            <FiEdit className="text-blue-700 text-lg cursor-pointer" />
                          </Link>
                        </td>
                        <td
                          onClick={() => productDelete(product.id)}
                          className="px-6 py-4"
                        >
                          <AiFillDelete className="text-red-700 text-xl cursor-pointer" />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
            <div>
              <ul className="flex justify-center items-center gap-2 mt-2">
                {pages.map((page, i) =>
                  current_page === i + 1 ? (
                    <li
                      key={i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        getProductsList(i + 1);
                      }}
                      className="bg-green-400
                    py-1 px-3 
                    border-none
                     text-white rounded-md
                     cursor-pointer"
                    >
                      {i + 1}
                    </li>
                  ) : (
                    <li
                      key={i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        if(isSearch){
                          searchProducts(searchTerm,i+1);
                        }else{
                          getProductsList(i + 1);
                        }
                      }}
                      className="bg-green-800
                    py-1 px-3 
                    border-none
                     text-white rounded-md
                     cursor-pointer"
                    >
                      {i + 1}
                    </li>
                  )
                )}
              </ul>
            </div>
          </>
        ) : (
          <div className="text-center">No data</div>
        )}
      </div>
    </div>
  );
};
