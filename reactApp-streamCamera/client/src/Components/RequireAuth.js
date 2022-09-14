import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const RequireAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  let user = cookies.get("user");

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname]);

  return <Outlet />;
};

export default RequireAuth;
