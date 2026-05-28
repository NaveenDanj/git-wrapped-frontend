import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import HomePage from "../pages/HomePage";
import LoginCallback from "../pages/LoginCallback";
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: createElement(HomePage),
    },
    {
        path: "/callback",
        element: createElement(LoginCallback),
    },
    {
        element: createElement(ProtectedRoute),
        children: []
    }
]);

export default router;