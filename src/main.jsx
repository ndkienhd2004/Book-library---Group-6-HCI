import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
