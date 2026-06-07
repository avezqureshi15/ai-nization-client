import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../app/auth/pages/login";
import ProtectedRoute from "./protected-route";
import ProtectedLayout from "../layouts/protected-layouts/protected-layouts";
import Chat from "../app/chat/pages/chat";
import HiringRequests from "../app/dashboard/hiring-requests/pages/hiring-requests";
import HiringRequestDetails from "../app/dashboard/hiring-requests-detail/pages/hiring-requests-detail";


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
          { path: "/hiring-requests", element: <HiringRequests /> },
          { path: "/hiring-requests/:id", element: <HiringRequestDetails /> },
        ],
      },
    ],
  },
]);