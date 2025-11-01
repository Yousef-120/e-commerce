import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./Layouts/MainLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<MainLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
