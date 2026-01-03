import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/mainLayout/mainLayout";
import Home from "../pages/Home/home";
import LookItem from "../pages/lookItem/lookItem";
import PostItem from "../pages/postItem/postItem";
import ItemsPage from "../pages/items/items";
import NotFound from "../pages/404/404";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "lookforitem",
        element: <LookItem />
      },
      {
        path: "postfounditem",
        element: <PostItem />
      },
      {
        path: "items",
        element: <ItemsPage />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFound />
  },
  {
    path: "/signup",
    element: <RegisterPage />,
    errorElement: <NotFound />
  }
]);

export default router;
