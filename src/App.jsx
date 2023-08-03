import { useState } from "react";
import {
    createBrowserRouter,
    RouterProvider,
    useNavigate,
} from "react-router-dom";
import "./App.css";
import Logout from "./Components/Auth/Logout";
import Login from "./Components/Auth/Signin";
import Signup from "./Components/Auth/Signup";
import NewPost from "./Components/NewPost";
import PostDetail from "./Components/PostDetail";
import Posts from "./Components/Posts";
import Profile from "./Components/Profile";
import ProtectedRoute from "./Components/ProtectedRoutes";
import List from "./Components/List"
import Dashboard from "./Components/Dashboard";


const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/logout", element: <Logout /> },
    { path: "/profile/:id", element: <Profile /> },
    { path: "/posts", element: <Posts /> },
    { path: "/edit-post", element: <NewPost /> },
    { path: "/post/:id", element: <PostDetail /> },
    { path: "/list/:id", element: <List /> },
    { path: "/dashboard", element: <Dashboard /> },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/",
                element: <div>Home</div>,
            },
            { path: "/secure", element: <div>Secure</div> },
            { path: "/contact", element: <div>contact</div> },
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
