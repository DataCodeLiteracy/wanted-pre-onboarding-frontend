import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Todo from "./pages/Todo";
import Root from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "signup",
        element: <Navigate to="/auth/signup" />
      },
      {
        path: "auth/signup",
        element: <Signup />
      },
      {
        path: "signin",
        element: <Navigate to="/auth/signin" />
      },
      {
        path: "auth/signin",
        element: <Signin />
      },
      {
        path: "todo",
        element: <Navigate to="/todos" />
      },
      {
        path: "todos",
        element: <Todo />
      },
      {
        path: "todos:todosId",
        element: <Todo />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
