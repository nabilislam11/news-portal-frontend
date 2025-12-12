import "./App.css";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
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
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
