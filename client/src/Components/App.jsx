import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductById from "../Pages/ProductById";
import ShoppingCartWishlist from "../Pages/ShoppingCartWishlist";
import Dashboard from "../Pages/Dashboard";
// import NormalRoute from "./NormalRoute";
import AuthPages from "../Pages/Auth";
import "../Styles/App.css";

export default function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />

      <Route path="/home" element={<HomePage />}></Route>

      <Route path="/shop" element={<ShopPage />} />

      <Route path="/product:id" element={<ProductById />} />

      <Route path="/shoppingcart" element={<ShoppingCartWishlist />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/login" element={<AuthPages />} />

    </Routes>
  );
}
