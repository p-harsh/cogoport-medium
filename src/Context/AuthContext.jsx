// LoadingContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: null,
    jwtToken: JSON.parse(localStorage.getItem("jwtToken")) || null,
    setJwtToken: null,
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [jwtToken, setJwtToken] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
        setJwtToken(JSON.parse(localStorage.getItem("jwtToken")));
    }, []);

    const value = { user, setUser, jwtToken, setJwtToken };
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
