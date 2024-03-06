import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/index.tsx";
import Register from "./pages/Register/index.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
