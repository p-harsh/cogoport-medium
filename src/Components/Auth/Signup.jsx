import { Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLoading } from "../../LoadingContext";
import { useAxios } from "../../useAxios";
import { checkAuth } from "../../utils";
import "./auth.css";

const SignUpSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    name: yup.string().required("Name is required"),
    email: yup
        .string()
        .email("Enter valid email")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
});

const SignUp = () => {
    const { loading, setLoading, showMessage, setShowMessage } = useLoading();
    const navigate = useNavigate();
    useEffect(() => {
        if (
            checkAuth()
        ) {
            navigate("/dashboard");
        }
    }, []);
    const handleSubmit = (values) => {
        async function Signup(values) {
            setLoading(true);
            const res = await useAxios({
                url: "/signup",
                method: "POST",
                body: JSON.stringify(values),
                headers: JSON.stringify({
                    "Access-Control-Allow-Origin": "*",
                }),
            });
            setLoading(false);
            if (res?.status) {
                setShowMessage({
                    status: "success",
                    message: "Signed Up SuccesFully, \n Please Login!!",
                });
                navigate("/login");
            } else {
                setShowMessage({
                    status: "error",
                    message: res?.message,
                });
                console.log("ERROR", res?.message);
            }
        }
        Signup(values);
    };
    return (
        <div className="signup flex flex-col justify-center">
            <Formik
                initialValues={{
                    username: "",
                    name: "",
                    password: "",
                    email: "",
                    confirmPassword: "",
                }}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmit}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                }) => (
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col items-center bg-gray-100 rounded-xl p-8 m-auto mt-[10%]"
                    >
                        <h3 className="text-2xl text-center font-semibold">
                            Sign Up
                        </h3>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                                    touched.username &&
                                    !!errors.username &&
                                    "border border-red-700"
                                }`}
                                placeholder="Enter your Username"
                            />
                            {touched.username && !!errors.username && (
                                <span className="text-xs text-red-700">
                                    {errors.username}
                                </span>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                                    touched.name &&
                                    !!errors.name &&
                                    "border border-red-700"
                                }`}
                                placeholder="Enter your name"
                            />
                            {touched.name && !!errors.name && (
                                <span className="text-xs text-red-700">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                                    touched.email &&
                                    !!errors.email &&
                                    "border border-red-700"
                                }`}
                                placeholder="Email"
                            />
                            {touched.email && !!errors.email && (
                                <span className="text-xs text-red-700">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="Password"
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                                    touched.password &&
                                    !!errors.password &&
                                    "border border-red-700"
                                }`}
                                placeholder="password"
                            />
                            {touched.password && !!errors.password && (
                                <span className="text-xs text-red-700">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
                                    touched.confirmPassword &&
                                    !!errors.confirmPassword &&
                                    "border border-red-700"
                                }`}
                                placeholder="Confirm Password"
                            />
                            {touched.confirmPassword &&
                                !!errors.confirmPassword && (
                                    <span className="text-xs text-red-700">
                                        {errors.confirmPassword}
                                    </span>
                                )}
                        </div>
                        <button
                            type="submit"
                            className="my-2 bg-green-500 text-white rounded-md"
                        >
                            Sign Up
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;
