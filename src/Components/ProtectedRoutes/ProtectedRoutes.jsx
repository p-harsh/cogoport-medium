import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    /**
     * State to save user details, status
     */
    const [user, setUser] = useState(false);

    /**
     * Run this when the component is loaded for the first time
     *
     * Check if user exists
     */
    useEffect(() => {
        try {
            // check if user exists
            console.log("use effect");
            let userType;
            if ((userType = localStorage.getItem("demo_user"))) {
                console.log("local storage exists");
                if (userType === "student") setUser(true);
                else navigate("/teacher");
            } else {
                console.log("local storage does not exist");
                navigate("/login");
            }
        } catch (err) {
            console.log("catch block", err);
            setUser(false);
            navigate("/login");
        }
    }, []);

    /**
     * If user exists, return whatever you want
     * Else, take user to login back
     */
    console.log({ user });
    return <Outlet />;
};

export default ProtectedRoute;