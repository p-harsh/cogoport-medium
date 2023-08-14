// LoadingContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { endpoints } from "../APIConfig/endpoint";
import { useAxios } from "../useAxios";
import { useLoading } from "./LoadingContext";

const AuthContext = createContext({
    user: null,
    setUser: null,
});

export function AuthProvider({ children }) {
    const { setShowMessage, setLoading } = useLoading();
    const [user, setUser] = useState(null);

    const checkUser = async () => {
        setLoading(true);
        const { res, error } = await useAxios({ url: endpoints.currentUser });
        setLoading(false);
        if (res?.id) {
            // correct data
            setUser(res);
            localStorage.setItem("user", JSON.stringify(res));
        }
        if (error) {
            // error
            setUser(null);
            localStorage.setItem("user", JSON.stringify({}));
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const value = { user, setUser };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}
