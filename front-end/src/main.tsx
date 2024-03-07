import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Register from "./pages/Register/index.tsx";
import Home from "./pages/Home/index.tsx";
import { Toaster } from "sonner";
import "./index.css";
import UserPhones from "./pages/UserPhones/index.tsx";
import Header from "./components/Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="w-4/5 mx-auto max-w-[1250px] pb-16 pt-8">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-phones" element={<UserPhones />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
