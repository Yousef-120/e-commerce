import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { h1 } from "framer-motion/client";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<h1>Page Not Found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}
