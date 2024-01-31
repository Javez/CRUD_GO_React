import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHome from "./components/UserHome";
import UserUpdate from "./components/user-update/UserUpdate";
import "./style/main.style.css";

function Main() {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/edit/:id" element={<UserUpdate />} />
    </Routes>
  );
}

export default Main;
