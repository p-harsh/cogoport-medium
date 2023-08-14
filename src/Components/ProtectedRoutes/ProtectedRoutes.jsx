import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import { endpoints } from "../../APIConfig/endpoint";

const ProtectedRoute = () => {
    const { user, setUser } = useAuth();
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    /**
    //  * State to save user details, status

    /**
     * Run this when the component is loaded for the first time
     *
     * Check if user exists
     */

    const checkUser = async () => {
        setLoading(true);
        const { res, error } = await useAxios({ url: endpoints.currentUser});
        setLoading(false);
        if (res?.status) {
            // error
            setShowMessage({
                status: "error",
                message: "Please Login!!",
            });
            navigate("/login");
        } else {
            // correct data
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    return <Outlet />;
};

export default ProtectedRoute;
