import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export const Home = () => {
  const { user } = useContext(AuthContext);
  return <div>{user?  <p>Hello {user.name}</p> : <p>Hello Guest</p>}</div>;
};
