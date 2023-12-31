import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOPICS } from "../../constants";
import Posts from "../Posts/Posts";

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("All Posts");

    useEffect(() => {
        // If want to change somethings on render
    }, []);

    const handleSelectedOption = (topic) => {
        let link = encodeURI(`/dashboard?tag=${topic}`);
        navigate(link);
        setSelectedOption(topic);
    };

    return (
        <div className="m-4">
            {/* Search */}
            <div className="flex justify-end px-[5%]">
                <button
                    className="m-1 p-1 bg-slate-100 border-[0.5px]"
                    type="button"
                    onClick={() => navigate("/top-posts")}
                >
                    Top Posts
                </button>
                {/* This API is not available currently in the server, uncomment if API available*/}
                <button
                    className="m-1 p-1 bg-slate-100 border-[0.5px]"
                    type="button"
                    onClick={() => navigate("/recommended-posts")}
                >
                    Recommended Posts
                </button>
                <button
                    className="m-1 p-1 bg-slate-100 border-[0.5px]"
                    type="button"
                    onClick={() => navigate("/similar-posts")}
                >
                    Similar Posts
                </button>
            </div>
            <div className="flex justify-start border-b-2 py-2 my-2 flex-wrap px-[5%]">
                <button
                    type="button"
                    className={`mx-2 border-none ${
                        selectedOption === "All Posts" ? "underline" : ""
                    }`}
                    onClick={() => {
                        window.location.href =
                            window.location.origin + "/dashboard";
                        setSelectedOption("All Posts");
                    }}
                >
                    All Posts
                </button>
                {TOPICS.map((topic) => (
                    <button
                        key={topic}
                        type="button"
                        className={`mx-2 border-none ${
                            selectedOption === topic ? "underline" : ""
                        }`}
                        onClick={() => {
                            handleSelectedOption(topic);
                        }}
                    >
                        {topic}
                    </button>
                ))}
            </div>
            <Posts selectedOption={selectedOption} />
        </div>
    );
};

export default Dashboard;
