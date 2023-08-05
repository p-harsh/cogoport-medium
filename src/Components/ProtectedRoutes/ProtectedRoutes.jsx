import jwt from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const ProtectedRoute = () => {
    const { user, jwtToken } = useAuth();
    const navigate = useNavigate();
    /**
    //  * State to save user details, status

    /**
     * Run this when the component is loaded for the first time
     *
     * Check if user exists
     */
    console.log("NAVIGATE");
    if (!user && !jwtToken) navigate("/login");

    /**
     * If user exists, return whatever you want
     * Else, take user to login back
     */
    return <Outlet />;
};

export default ProtectedRoute;
