import React from "react";
import axios from "axios";

const axiosWithAuth = () => {
  let token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
