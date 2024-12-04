import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ShopPage from "../Pages/ShopPage";
import ProductById from "../Pages/ProductById";
import ShoppingCartWishlist from "../Pages/ShoppingCartWishlist";
import Dashboard from "../Pages/Dashboard";
import NormalRoute from "./NormalRoute";
import AuthPages from "../Pages/Auth";
import CheckoutPage from "../Pages/CheckoutPage";

export default function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <NormalRoute>
            <HomePage />
          </NormalRoute>
        }
      />

      <Route path="/shop" element={<ShopPage />} />

      {/* Dynamic route for product by ID */}
      <Route
        path="/shop/getProductById/:productId"
        element={
          <NormalRoute>
            <ProductById />
          </NormalRoute>
        }
      />

      <Route
        path="/home/:userName"
        element={
          <NormalRoute>
            <HomePage/>
          </NormalRoute>
        }
      />

      <Route
        path="/shop/shoppingcart/"
        element={
          <NormalRoute>
            <ShoppingCartWishlist />
          </NormalRoute>
        }
      />

      <Route
        path="/shop/shoppingcart/checkout"
        element={
          <NormalRoute>
            <CheckoutPage />
          </NormalRoute>
        }
      />

      <Route path="/admin/dashboard" element={<Dashboard />} />

      <Route path="/login" element={<AuthPages />} />
    </Routes>
  );
}
