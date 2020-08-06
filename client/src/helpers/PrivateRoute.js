import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
