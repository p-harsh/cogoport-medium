import { Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";

const SignInSchema = yup.object().shape({
    email: yup
        .string()
        .email("Enter valid email")
        .required("Email is required"),
    password: yup.string().required("Password Is Required"),
});

const SignIn = () => {
    const { user, setUser, jwtToken, setJwtToken } = useAuth();
    const { setLoading, setShowMessage } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && jwtToken) {
            navigate(-1);
        }
    }, []);

    return (
        <div className="login flex flex-col justify-center">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={SignInSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    // Add submit logic here
                    setLoading(true);
                    const res = await useAxios({
                        url: "/signin",
                        method: "POST",
                        body: JSON.stringify(values),
                    });
                    setLoading(false);
                    if (res?.status) {
                        setShowMessage({
                            status: "success",
                            message: "Succesfull Logged In!!",
                        });
                        navigate("/dashboard");
                        setUser(JSON.parse(localStorage.getItem("user")));
                        setJwtToken(
                            JSON.parse(localStorage.getItem("jwtToken"))
                        );
                    } else {
                        console.log(res);
                        // for error
                        setShowMessage({
                            status: "error",
                            message:
                                res?.message + "\n" + res?.response?.statusText,
                        });
                    }
                }}
            >
                {({
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    setValues,
                }) => (
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="flex flex-1 flex-col items-center bg-gray-100 rounded-xl p-8 m-auto mt-[10%]"
                    >
                        <h3 className="text-2xl text-center font-semibold">
                            Sign In
                        </h3>
                        <div className="mt-2">
                            <input
                                type="email"
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
                                autoComplete="password"
                                className={`block flex-1 border border-1 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 my-2 ${
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
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                        >
                            Login
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default SignIn;
