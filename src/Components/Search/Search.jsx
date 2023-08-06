import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Posts from "../Posts";
import Authors from "./Authors";

const Search = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const Author = searchParams.get("s-author") || "";
    const Post = searchParams.get("s-post") || "";
    const Topic = searchParams.get("tag") || "";

    return (
        <div>
            {
                <p className="text-center mt-4">
                    Search results for "
                    <strong>{Author || Post || Topic}</strong>"
                </p>
            }
            {!Author ? <Posts renderFilter={false} /> : <Authors author={Author}/>}
        </div>
    );
};

export default Search;
