import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostTab from "../Posts/PostTab";
import { handleListShare } from "./List.helper";

const List = () => {
    const { id } = useParams();
    const [isCopied, setIsCopied] = useState(false);
    const [listPosts, setListPosts] = useState([]);

    useEffect(() => {
        // fetch based on the list id and author
        setListPosts([
            {
                id: 1,
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
            },
            {
                id: 2,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
            },
        ]);
    }, [id]);

    return (
        <div className="flex flex-col m-4">
            <div className="self-end ">
                {isCopied ? (
                    <span className="bg-none text-sm text-green-600 mx-2 font-thin ">
                        Copied
                    </span>
                ) : null}
                <button
                    type="button"
                    className="bg-zinc-200"
                    onClick={() => handleListShare(setIsCopied)}
                >
                    Share
                </button>
            </div>
            {listPosts.map((post) => (
                <PostTab {...post} />
            ))}
        </div>
    );
};

export default List;
