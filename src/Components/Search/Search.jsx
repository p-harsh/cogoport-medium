import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Posts from "../Posts";

const Search = () => {
    const [searchParams] = useSearchParams();
    const Author = searchParams.get("s-author") || "";
    const Post = searchParams.get("s-post") || "";
    const Topic = searchParams.get("s-topic") || "None";

    return (
        <div>
            {
                <p className="text-center mt-4">
                    Search results for "
                    <strong>{Author || Post || Topic}</strong>"
                </p>
            }
            <Posts renderFilter={false} />
        </div>
    );
};

export default Search;
