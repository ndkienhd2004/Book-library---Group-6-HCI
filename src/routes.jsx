import {
  createBrowserRouter,
  RouterProvider,
  useRoutes,
} from "react-router-dom";
import PATH from "./constants/path";
import Home from "./pages/home";
import About from "./pages/about";
import Library from "./pages/library";
import Uploading from "./pages/uploading";
import Register from "./pages/Register";
import Login from "./pages/Login";
function createRoutes() {
  const routes = useRoutes([
    {
      path: PATH.home,
      index: true,
      element: <Home />,
    },
    {
      path: PATH.about,
      element: <About />,
    },
    {
      path: PATH.library,
      element: <Library />,
    },
    {
      path: PATH.uploading,
      element: <Uploading />,
    },
    {
      path: PATH.register,
      element: <Register />,
    },
    { path: PATH.login, element: <Login /> },
  ]);
  return routes;
}
export default createRoutes;
