import "./App.css";
import createRoutes from "./routes";
import NavBar from "./components/NavigationBar/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "./context/context";

function App() {
  const routes = createRoutes();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);

  useEffect(() => {
    const publicPaths = ["/register", "/login"];
    if (!auth.token && !publicPaths.includes(location.pathname)) {
      console.log("No auth token found, redirecting to login");
      navigate("/login");
    }
  }, [auth.token, location.pathname, navigate]);

  return (
    <div>
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
