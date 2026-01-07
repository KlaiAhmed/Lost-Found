import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/mainLayout/mainLayout";
import Home from "../pages/Home/home";
import LookForItem from "../pages/lookForItem/lookForItem";
import PostItem from "../pages/postItem/postItem";
import ItemsPage from "../pages/items/items";
import NotFound from "../pages/errors/404/404";
import LoginPage from "../pages/login/login";
import RegisterPage from "../pages/register/register";
import ProfilePage from "../pages/profile/profile";
import Forbidden from "../pages/errors/403/403";
import { RequireRole, GuestOnly } from "./requireRole";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "items", element: <ItemsPage /> },
      { path: "unauthorized", element: <Forbidden /> },
      {
        element: <RequireRole allowedRoles={["user", "admin"]} />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "lookforitem", element: <LookForItem /> },
          { path: "postfounditem", element: <PostItem /> }
        ]
      }
    ]
  },
  {
    element: <GuestOnly />,
    children: [
      { path: "/signin", element: <LoginPage /> },
      { path: "/signup", element: <RegisterPage /> }
    ]
  }
]);

export default router;
