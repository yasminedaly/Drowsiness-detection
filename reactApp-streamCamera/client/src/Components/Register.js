import React, { useState } from "react";
import "../Register.css";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Alert, AlertTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [name, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email)
        return setError("Please enter your email address to register");

      if (!password) return setError("Please enter your password to register");

      if (!name) return setError("Please enter your name to register");

      if (password.length < 8)
        return setError("Password must be at least 8 characters long");

      let res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        {
          name,
          email,
          password,
        }
      );
      setSuccess(res.data.message);
      res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });
      cookies.set("accessToken", res.data.accessToken, { path: "/" });
      cookies.set("user", res.data.user, { path: "/" });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Server Response Error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Register Here</h3>
        <label htmlFor="email">Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <div className="Alert">
        {error ? (
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        ) : null}
        {success ? (
          <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            {success}
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Register;
