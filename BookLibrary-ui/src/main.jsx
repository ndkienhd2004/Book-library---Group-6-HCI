import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);
