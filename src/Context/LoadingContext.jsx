// LoadingContext.js
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

const LoadingContext = createContext({
    loading: false,
    setLoading: null,
    showMessage: null,
    setShowMessage: null,
});

const LoadingElement = ({ loading }) => {
    const loadingRef = useRef();

    useEffect(() => {
        loadingRef.current.showModal();
    }, []);

    return (
        <dialog ref={loadingRef} className="loader-container">
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
        </dialog>
    );
};

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [showMessage, setShowMessage] = useState();
    const renderMessage = useCallback(() => {
        if (showMessage) {
            setTimeout(() => setShowMessage(null), 3000);
        }
        if (
            showMessage &&
            (showMessage?.status === "Success" ||
                showMessage?.status === "success")
        ) {
            return (// className to change styling 
                <div className={`bg-green-500 ${showMessage?.className}`}>
                    {showMessage.message}
                </div>
            );
        } else if (
            showMessage &&
            (showMessage?.status === "Error" || showMessage?.status === "error")
        ) {
            return (
                <div
                    className={`bg-red-500 text-white ${showMessage?.className}`}
                >
                    {showMessage?.message}
                </div>
            );
        } else {
            // want to render some special kind of pop up message
            return (
                <div className={showMessage?.className}>
                    {showMessage?.message}
                </div>
            );
        }
    }, [showMessage]); // whenever showMessage changes

    const value = { loading, setLoading, showMessage, setShowMessage };
    return (
        <LoadingContext.Provider value={value}>
            {children}
            {value.loading ? <LoadingElement loading={loading} /> : null}

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
