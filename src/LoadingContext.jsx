// LoadingContext.js
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const LoadingContext = createContext({
    loading: false,
    setLoading: null,
    showMessage: null,
    setShowMessage: null,
    // message: null,
});

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(null);
    const renderMessage = useCallback(() => {
        if (showMessage) {
            setTimeout(() => setShowMessage(null), 3000);
        }
        if (
            showMessage &&
            (showMessage?.status === "Success" ||
                showMessage?.status === "success")
        ) {
            return <div className="bg-green-500">{showMessage.message}</div>;
        } else if (
            showMessage &&
            (showMessage?.status === "Error" || showMessage?.status === "error")
        ) {
            return (
                <div className="bg-red-500 text-white">
                    {showMessage?.message}
                </div>
            );
        }
    }, [showMessage]);

    const value = { loading, setLoading, showMessage, setShowMessage };
    return (
        <LoadingContext.Provider value={value}>
            {children}
            {value.loading ? (
                <div className="loader-container">
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ) : null}

            {!!showMessage ? (
                <div className="message-container">{renderMessage()}</div>
            ) : null}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within LoadingProvider");
    }
    return context;
}
