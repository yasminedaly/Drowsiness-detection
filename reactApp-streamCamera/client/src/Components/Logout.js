import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    cookies.remove("accessToken");
    cookies.remove("user");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (!cookies.get("user")) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        right: "0",
        left: "0",
        margin: "auto",
        width: "30%",
        padding: "20px",
      }}
    >
      <Button variant="contained" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
