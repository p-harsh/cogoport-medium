import React, { useEffect, useState } from "react";
import {
    Outlet,
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard";
import Drafts from "./Components/Drafts";
import EditPost from "./Components/EditPost";
import EditDraft from "./Components/EditPost/EditDraft";
import List from "./Components/List";
import Navbar from "./Components/Navbar";
import PostDetail from "./Components/PostDetail";
import PaymentSuccess from "./Components/PostDetail/Payment/PaymentSuccess";
import Posts from "./Components/Posts";
import SpecialPosts from "./Components/Posts/SpecialPosts";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Search from "./Components/Search";
import { AuthProvider } from "./Context/AuthContext";
import { LoadingProvider } from "./Context/LoadingContext";

const RouterContainer = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RouterContainer />,
        children: [
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <Signup /> },
            { path: "/profile/:id", element: <Profile /> },
            { path: "/posts", element: <Posts /> },
            { path: "/post/:id", element: <PostDetail /> },
            { path: "/search", element: <Search /> },
            { path: "/top-posts", element: <SpecialPosts type="top-posts" /> },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/payment-success/:price",
                        element: <PaymentSuccess />,
                    },
                    { path: "/drafts", element: <Drafts /> },
                    { path: "/dashboard", element: <Dashboard /> },
                    { path: "/list/:id", element: <List /> },
                    { path: "/edit-post/:id", element: <EditPost /> },
                    { path: "/edit-draft/:id", element: <EditDraft /> },
                    {
                        path: "/similar-posts",
                        element: <SpecialPosts type="similar-posts" />,
                    },
                    {
                        path: "/recommended-posts",
                        element: <SpecialPosts type="recommended-posts" />,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <>
            {/* <React.StrictMode> */}
            <LoadingProvider>
                <AuthProvider>
                    {/* <Navbar /> */}
                    <RouterProvider router={router} />
                </AuthProvider>
            </LoadingProvider>
            {/* </React.StrictMode> */}
        </>
    );
}

export default App;
