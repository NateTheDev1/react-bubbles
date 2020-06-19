import React, { useState } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", formValues)
      .then((res) => {
        setFormValues({
          username: "",
          password: "",
        });
        localStorage.setItem("token", res.data.payload);
        history.push("/bubbles");
      })
      .catch((err) => {
        setError(err.response.message);
      });
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <h1>Welcome to the Bubble App!</h1>
      {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
      <form
        style={{ width: "75%", margin: "0 auto", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <h3>Username</h3>
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          style={{ width: "100%" }}
          placeholder="Username"
        />
        <h3>Password</h3>
        <input
          style={{ width: "100%" }}
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit" style={{ marginTop: "5%" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
