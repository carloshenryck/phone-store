import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Register from "./pages/Register/index.tsx";
import Home from "./pages/Home/index.tsx";
import { Toaster } from "sonner";
import "./index.css";
import UserPhones from "./pages/UserPhones/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user-phones" element={<UserPhones />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
