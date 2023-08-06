import React, { useEffect, useState } from "react";
import PostTab from "./PostTab";

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const SpecialPosts = ({ type }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        //
        if (type === "top-posts") {
            // fetch differently for both and save in Posts
        } else if (type === "recommended-posts") {
            // fetch the data
        } else if (type === "similar-posts") {
            // fetch the data
        }
        setPosts([
            {
                id: 1,
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
                authorId: 1,
            },
            {
                id: 2,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
                authorId: 2,
            },
            {
                id: 3,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "31st July, 2023",
                author: "blah",
                authorId: 1,
            },
        ]);
    }, [type]);
    return (
        <div className="flex flex-col mx-auto mt-4">
            <div className="text-center text-2xl font-medium">
                {type
                    .split("-")
                    .map((e) => capitalizeFirstLetter(e))
                    .join(" ")}
            </div>
            <div className="m-4">
                {posts.map((post) => (
                    <PostTab {...post} />
                ))}
            </div>
        </div>
    );
};

export default SpecialPosts;
