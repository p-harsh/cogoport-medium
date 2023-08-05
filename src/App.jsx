import React, { useEffect, useState } from "react";
import {
    RouterProvider,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./AuthContext";
import Login from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import Dashboard from "./Components/Dashboard";
import Drafts from "./Components/Drafts";
import List from "./Components/List";
import Navbar from "./Components/Navbar";
import NewPost from "./Components/NewPost";
import EditDraft from "./Components/NewPost/EditDraft";
import PostDetail from "./Components/PostDetail";
import PaymentSuccess from "./Components/PostDetail/PaymentSuccess";
import Posts from "./Components/Posts";
import TopPosts from "./Components/Posts/TopPosts";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoutes";
import Search from "./Components/Search";
import { LoadingProvider } from "./LoadingContext";

// postsRead make a ist in localStorage of 10 previous day posts

const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/posts", element: <Posts /> },
    { path: "/post/:id", element: <PostDetail /> },
    { path: "/search", element: <Search /> },
    { path: "/top-posts", element: <TopPosts type="top-posts" /> },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { path: "/payment-success/:price", element: <PaymentSuccess /> },
            { path: "/drafts", element: <Drafts /> },
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/list/:id", element: <List /> },
            { path: "/edit-post", element: <NewPost /> },
            { path: "/edit-draft", element: <EditDraft /> },
            {
                path: "/similar-posts",
                element: <TopPosts type="similar-posts" />,
            },
            {
                path: "/recommended-posts",
                element: <TopPosts type="recommended-posts" />,
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
                    <Navbar />
                    <RouterProvider router={router} />
                </AuthProvider>
            </LoadingProvider>
            {/* </React.StrictMode> */}
        </>
    );
}

export default App;
