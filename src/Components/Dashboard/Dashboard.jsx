import React, { useState } from "react";
import Posts from "../Posts/Posts";

const Dashboard = () => {
    const [selectedSearch, setSelectedSearch] = useState("Post");
    return (
        <div className="m-4">
            {/* Search */}
            <div>
                <button className='m-1 bg-slate-100' type="button">Top Posts</button>
                <button className='m-1 bg-slate-100' type="button">Recommended Posts</button>
            </div>
            <div className="search flex flex-row justify-center my-4">
                {selectedSearch === "Topic" ? (
                    <select
                        name="search-topic"
                        id="search-topic"
                        className="border-2 mx-1 px-2"
                        // onChange={(e) => handleSearchesChange(e, "topic")}
                        // value={searches["topic"]}
                    >
                        <option value="None">None</option>
                        <option value="Health">Health</option>
                        <option value="Health">Health</option>
                        <option value="Health">Health</option>
                        <option value="Health">Health</option>
                    </select>
                ) : (
                    <input
                        className="border-2 mx-1 px-2"
                        // onChange={(e) => handleSearchesChange(e, "author")}
                        // value={searches["author"]}
                        placeholder={selectedSearch}
                        type="text"
                        name="search-author"
                        id="search-author"
                    />
                )}
                <select
                    name="search-topic"
                    id="search-topic"
                    className="border-2 mx-1 px-2"
                    onChange={(e) => setSelectedSearch(e.target.value)}
                    value={selectedSearch}
                >
                    <option value="Post">Post</option>
                    <option value="Author">Author</option>
                    <option value="Topic">Topic</option>
                </select>
                {/* <input
                    className="border-2 mx-1 px-2"
                    onChange={(e) => handleSearchesChange(e, "post")}
                    value={searches["post"]}
                    placeholder="Post"
                    type="text"
                    name="search-post"
                    id="search-post"
                />
                <select
                    name="search-topic"
                    id="search-topic"
                    className="border-2 mx-1 px-2"
                    onChange={(e) => handleSearchesChange(e, "topic")}
                    value={searches["topic"]}
                >
                    <option value="None">None</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                </select> */}
                <button
                    type="button"
                    // onClick={handleSearchSubmit}
                >
                    Search
                </button>
            </div>
            <Posts />
        </div>
    );
};

export default Dashboard;
