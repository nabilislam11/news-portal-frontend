import "./App.css";
import Login from "./dashboard/pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import DashRootLayout from "./dashboard/layout/DashRootLayout";
import DashHome from "./dashboard/pages/DashHome";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "category",
        element: <CategoryPage />,
      },
      // {
      //   path: "/post",
      //   element: <Post />,
      // },
    ],
  },
  {
    path: "/dashboard",
    element: <DashRootLayout />,
    children: [{ index: true, element: <DashHome /> }],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
