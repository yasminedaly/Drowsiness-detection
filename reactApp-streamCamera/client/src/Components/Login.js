import React from "react";
import "../App.css";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Alert, AlertTitle } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) return setError("Please enter your email address to login");
      if (!password) return setError("Please enter your password to login");

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      cookies.set("accessToken", res.data.accessToken, { path: "/" });
      cookies.set("user", res.data.user, { path: "/" });
      setSuccess(res.data.message);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Server Response Error");
    }
  };

  useEffect(() => {
    setError("");
    setSuccess("");
  }, [email, password]);

  useEffect(() => {
    const user = cookies.get("user");
    if (user) navigate("/", { replace: true });
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
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
        <button>Log In</button>
        <div className="social">
          <p>
            If you don't have account{" "}
            <Link to={"/register"}>Register Here</Link>
          </p>
        </div>
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
            {error}
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default Login;
