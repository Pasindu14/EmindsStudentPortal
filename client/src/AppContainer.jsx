import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const AppContainer = () => {
  return (
    <div id="detail">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppContainer;
