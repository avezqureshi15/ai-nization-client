import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../app/auth/pages/login";
import ProtectedRoute from "./protected-route";
import ProtectedLayout from "../layouts/protected-layouts/protected-layouts";
import Chat from "../app/chat/pages/chat";
import Dashboard from "../app/dashboard/pages/dashboard";
import JobDetails from "../app/dashboard/details/pages";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ProtectedLayout />,
        children: [
          // root redirect INSIDE protected flow
          {
            path: "/",
            element: <Navigate to="/chat" replace />,
          },

          { path: "/chat", element: <Chat /> },
          { path: "/hiring-requests", element: <Dashboard /> },
          { path: "/hiring-requests/:id", element: <JobDetails /> },
        ],
      },
    ],
  },
]);