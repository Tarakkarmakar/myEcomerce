import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

import { CartProvider } from "./Context/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </AuthProvider>
);
