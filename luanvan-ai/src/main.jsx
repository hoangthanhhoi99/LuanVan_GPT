import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/app.js";
import "./index.css";
import ChatDetail from "./pages/ChatDetail.jsx";
import Update from "./components/Update.jsx";
import Tailieu from "./components/Tailieu.jsx";
import Extend from "./components/Extend.jsx";
import Login from "./login.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/chat/info" />,
      },
      {
        path: "/chat/info",
        element: <ChatDetail />,
      },
      {
        path: "/chat/:id",
        element: <ChatDetail />,
      },
    ],
  },
  {
    path: "/update",
    element: <Update />,
  },
  {
    path: "/document",
    element: <Tailieu />,
  },
  {
    path: "/extend",
    element: <Extend />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
