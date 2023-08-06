import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const ProtectedRoute = () => {
    const { user, jwtToken, setUser, setJwtToken } = useAuth();
    let lCUser = localStorage.getItem("user");
    let lCToken = localStorage.getItem("jwtToken");
    const navigate = useNavigate();
    /**
    //  * State to save user details, status

    /**
     * Run this when the component is loaded for the first time
     *
     * Check if user exists
     */
    useEffect(() => {
        if (!lCToken || !lCUser) navigate("/login");
    }, []);

    // if (jwtToken !== lCToken) {
    //     setJwtToken(JSON.parse(lCToken));
    // }
    // if (user?.id !== JSON.parse(lCUser)?.id) {
    //     setUser(JSON.parse(lCUser)?.id);
    // }

    /**
     * If user exists, return whatever you want
     * Else, take user to login back
     */
    // if (user && jwtToken && lCUser && lCTOken) return <Outlet />;
    // else navigate("/login");
    if (user && jwtToken) return <Outlet />;
};

export default ProtectedRoute;
