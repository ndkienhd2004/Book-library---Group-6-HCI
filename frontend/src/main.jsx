import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes

    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);