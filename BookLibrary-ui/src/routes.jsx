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
import BookDetails from "./components/BookDetail/BookDetail";
import Profile from "./pages/Library/LibraryPage/Profile/Profile";
import SavedBooks from "./pages/Library/LibraryPage/SavedBooks/SavedBooks";
import History from "./pages/Library/LibraryPage/History/History";
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
      children: [
        {
          index: true,
          element: <Profile />,
        },
        { path: PATH.savedBooks, element: <SavedBooks /> },
        { path: PATH.history, element: <History /> },
      ],
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
    {
      path: "/books/:bookid",
      element: <BookDetails />,
    },
  ]);
  return routes;
}
export default createRoutes;
