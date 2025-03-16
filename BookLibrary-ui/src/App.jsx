import "./App.css";
import createRoutes from "./routes";
import NavBar from "./components/NavigationBar/NavigationBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "./context/context";
import ChatBox from "./components/ChatBox/ChatBox";

function App() {
  const routes = createRoutes();
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useContext(AppContext);
  const hideNavbarRoutes = ["/book"];
  const hideChatBookRoutes = ["/login", "/register"];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const shouldHideChatBox = hideChatBookRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  useEffect(() => {
    const publicPaths = ["/register", "/login"];
    if (!auth.token && !publicPaths.includes(location.pathname)) {
      console.log("No auth token found, redirecting to login");
      navigate("/login");
    } else if (auth.token && publicPaths.includes(location.pathname)) {
      console.log("Auth token found, redirecting to home");
      navigate("/");
    }
  }, [auth.token, location.pathname, navigate]);

  return (
    <div>
      {!shouldHideChatBox && <ChatBox />}
      {!shouldHideNavbar && <NavBar />}
      {routes}
    </div>
  );
}

export default App;
