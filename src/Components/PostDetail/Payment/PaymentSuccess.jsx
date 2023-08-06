import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../../Context/LoadingContext";

const PaymentSuccess = () => {
    const navigate = useNavigate();
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
