import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import createRoutes from "./routes";
import NavBar from "./components/NavigationBar/NavigationBar";

function App() {
  const routes = createRoutes();
  return (
    <div>
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
