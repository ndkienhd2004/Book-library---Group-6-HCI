import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import createRoutes from "./routes";

function App() {
  const routes = createRoutes();
  return <div>{routes}</div>;
}

export default App;
