import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../pages/mainLayout/mainLayout";
import Home from "../pages/Home/home";
import LookItem from "../pages/lookItem/lookItem";
import PostItem from "../pages/postItem/postItem";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      }
    ]
  }
]);

export default router;
