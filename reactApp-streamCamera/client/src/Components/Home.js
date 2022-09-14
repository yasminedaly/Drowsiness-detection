import React, { useEffect, useState } from "react";
import "../App.css";
import Logout from "./Logout";
import axios from "axios"
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Home = () => {
  
  const [initialData, setInitialData] = useState([{}]);

  const get_metric = () => { 
    axios.get("http://localhost:5000/detect").then((res) => {
      setInitialData(res.data);
      console.log(res.data)
    })
  };

  useEffect(() => {
    try {
      const user = cookies.get("user");
      setInitialData(user);
      get_metric();
      // const res = axios.post(`${process.env.REACT_APP_API_URL}/cam`, {
      //   user
      // });
    }
    catch (err) {
      console.log(err)
    }
  }, []);

  return (
    <div>
      <Logout />
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          left: "0",
          margin: "auto",
          width: "10%",
          padding: "20px",
          color: "white"
        }}
      >
      
        <h1>Home</h1>
        
      </div>
      <div style={{
        position :"absolute",
        color: "white",
        width: "80%",

      }}><h3>Driver Condition: {initialData.sleep_message}</h3><br/>
          <h3>{initialData.yawn_message}</h3></div>
    </div>
  );
};

export default Home;
