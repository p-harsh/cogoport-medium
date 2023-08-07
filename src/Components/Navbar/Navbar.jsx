import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { TOPICS } from "../../constants";
import { useAxios } from "../../useAxios";
import { LogoutSVG, SearchSVG, WriteSVG} from "../Icons/Icons";
import Search from "../Search/Search";
import { initialSearch } from "./Navbar.constant";
import { handleSearchSubmit } from "./Navbar.helper";

const Navbar = () => {
    const navigate = useNavigate();
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

    return (
        <div className="w-full bg-slate-50 px-4 py-4 shadow-md flex justify-between items-center flex-wrap">
            <div className="flex gap-4 items-center sm:justify-between w-full sm:w-[90%] mx-auto flex-wrap justify-start">
                {user && jwtToken ? (
                    <a className="hover:underline" href="/dashboard">
                        Dashboard
                    </a>
                ) : null}
                {!user || !jwtToken ? (
                    <Link className="hover:underline" to="/posts">
                        Posts
                    </Link>
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
                                {TOPICS.map((topic) => (
                                    <option key={topic} value={topic}>{topic}</option>
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
                            onClick={() =>
                                handleSearchSubmit(searches, selectedSearch)
                            }
                            title="Search"
                        >
                            <span>
                                <SearchSVG className="w-[28px] h-[28px] bg-slate-50" />
                            </span>
                        </button>
                    </div>
                }
                {!user || !jwtToken ? (
                    <div>
                        <Link className="hover:underline mx-2" to="/login">
                            Login
                        </Link>
                        <Link className="hover:underline mx-2" to="/signup">
                            Signup
                        </Link>
                    </div>
                ) : null}
                {user && jwtToken ? (
                    <div className="flex items-center">
                        <Link
                            className="hover:underline mx-2 flex items-center"
                            to={`/edit-post/-1`}
                            title="Write a Post"
                        >
                            Write
                            <span className="ml-1">
                                <WriteSVG />
                            </span>
                        </Link>
                        <Link
                            className="hover:underline mx-2"
                            to={`/profile/${user.id}`}
                        >
                            Profile
                        </Link>
                        <Link
                            to="/login"
                            className="hover:underline mx-2"
                            onClick={handleLogout}
                            title="Logout"
                        >
                                <span>
                                    <LogoutSVG className="w-[24px] h-[24px] bg-slate-50" />
                                </span>
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;
