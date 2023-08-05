import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useAxios } from "../../useAxios";
import { checkAuth } from "../../utils";
import { topics } from "../Dashboard";

export const WriteSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 -960 960 960"
        width="48"
        className="w-4 h-4"
    >
        <path d="M180-12q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h405l-60 60H180v600h600v-348l60-60v408q0 24-18 42t-42 18H180Zm300-360Zm182-352 43 42-285 284v86h85l286-286 42 42-303 304H360v-170l302-302Zm171 168L662-724l100-100q17-17 42.311-17T847-823l84 85q17 18 17 42.472T930-654l-97 98Z" />
    </svg>
);

const initialSearch = {
    author: "",
    post: "",
    topic: "None",
};

const Navbar = () => {
    const { user, setUser, jwtToken, setJwtToken } = useAuth();
    const [selectedSearch, setSelectedSearch] = useState("post");
    const [searches, setSearches] = useState(initialSearch);
    const handleLogout = () => {
        useAxios({ url: "/logout", method: "POST" });
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        localStorage.removeItem("plan");
        setUser(null);
        setJwtToken(null);
    };

    const handleSearchesChange = (e, topic) => {
        let tmpSearch = { ...searches };
        tmpSearch[topic] = e.target.value;
        setSearches(tmpSearch);
    };

    const handleSearchSubmit = () => {
        if (
            (selectedSearch === "author" && searches["author"]) ||
            (selectedSearch === "post" && searches["post"]) ||
            (selectedSearch === "topic" && searches["topic"])
        ) {
            let link = encodeURI(
                `/search?s-${selectedSearch.toLowerCase()}=${
                    searches[selectedSearch.toLowerCase()]
                }`
            );
            window.location.href = window.location.origin + link;
        }
    };

    const userId = JSON.parse(localStorage.getItem("user"))?.id;

    return (
        <div className="w-full bg-slate-50 px-4 py-4 shadow-md flex justify-between items-center flex-wrap">
            <div className="flex gap-4 items-center sm:justify-between w-full sm:w-[90%] mx-auto flex-wrap justify-start">
                {user && jwtToken ? (
                    <a className="hover:underline" href="/dashboard">
                        Dashboard
                    </a>
                ) : null}
                {
                    <div className="search relative flex flex-row justify-start sm:justify-center my-1 flex-wrap">
                        {selectedSearch === "topic" ? (
                            <select
                                name="search-topic"
                                id="search-topic"
                                className="border-2 mx-1 px-2 py-2"
                                onChange={(e) =>
                                    handleSearchesChange(e, "topic")
                                }
                                value={searches["topic"]}
                            >
                                <option value="None">None</option>
                                {topics.map((topic) => (
                                    <option value={topic}>{topic}</option>
                                ))}
                            </select>
                        ) : null}
                        {selectedSearch === "author" ? (
                            <input
                                className="border-2 mx-1 px-2 py-2"
                                onChange={(e) =>
                                    handleSearchesChange(e, "author")
                                }
                                value={searches["author"]}
                                placeholder={selectedSearch}
                                type="text"
                                name="search-author"
                                id="search-author"
                            />
                        ) : null}
                        {selectedSearch === "post" ? (
                            <input
                                className="border-2 mx-1 px-2 py-2"
                                onChange={(e) =>
                                    handleSearchesChange(e, "post")
                                }
                                value={searches["post"]}
                                placeholder={selectedSearch}
                                type="text"
                                name="search-post"
                                id="search-post"
                            />
                        ) : null}
                        <select
                            name="search-topic"
                            id="search-topic"
                            className="mx-1 px-2 bg-transparent cursor-pointer border-l-2 border-slate-200 border-y-0 border-r-0"
                            onChange={(e) => setSelectedSearch(e.target.value)}
                            value={selectedSearch}
                        >
                            <option value="post">Post</option>
                            <option value="author">Author</option>
                            <option value="topic">Topic</option>
                        </select>
                        <button
                            type="button"
                            className="p-0 px-2 border-slate-100"
                            onClick={handleSearchSubmit}
                        >
                            Search
                        </button>
                    </div>
                }
                {!user || !jwtToken ? (
                    <div>
                        <a className="hover:underline mx-2" href="/login">
                            Login
                        </a>
                        <a className="hover:underline mx-2" href="/signup">
                            Signup
                        </a>
                    </div>
                ) : null}
                {user && jwtToken ? (
                    <div className="flex items-center">
                        <a
                            className="hover:underline mx-2 flex items-center"
                            href={`/edit-post`}
                        >
                            Write
                            <span className="ml-1">
                                <WriteSVG />
                            </span>
                        </a>
                        <a
                            className="hover:underline mx-2"
                            href={`/profile/${user.id}`}
                        >
                            Profile
                        </a>
                        <a
                            href="/login"
                            className="hover:underline mx-2"
                            onClick={handleLogout}
                        >
                            Logout
                        </a>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;
