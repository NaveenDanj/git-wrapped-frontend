import { createBrowserRouter } from "react-router-dom";
import { createElement } from "react";
import HomePage from "../pages/HomePage";
import LoginCallback from "../pages/LoginCallback";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import StoryPage from "../pages/Story";
import FeedPage from "../pages/Feed";

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
        children: [
            {
                path: "/profile",
                element: createElement(Profile),
            },
            {
                path: "/story",
                element: createElement(StoryPage),
            },
            {
                path: "/feed",
                element: createElement(FeedPage),
            },
        ]
    }
]);

export default router;