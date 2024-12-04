import React from "react";
import ReactDOM from "react-dom/client";
import "./src/index.css";
import App from "./src/Components/App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./src/Components/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
