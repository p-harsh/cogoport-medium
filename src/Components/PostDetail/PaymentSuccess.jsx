import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const PaymentSuccess = () => {
    const { price } = useParams();
    const { setShowMessage } = useLoading();
    useEffect(() => {
        localStorage.setItem("plan", `${price}`);
        setShowMessage({
            status: "success",
            message: "Payment Successfull, Congrats",
        });
        navigate("/dashboard");
    }, []);
    return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
