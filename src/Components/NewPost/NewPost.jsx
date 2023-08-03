import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
// import remarkGfm from "remark-gfm";

const NewPost = () => {
    const [searchParams] = useSearchParams();
    const postId = searchParams.get("id") || "";
    const [postContent, setPostContent] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
        if (postId !== "") {
            // fetch data based on the postId
            // update the content title and src
        }
    }, []);
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImgSrc(URL.createObjectURL(img));
        }
    };

    const getWordsCount = (content) => {
        let len = content.split(" ").length;
        // 265 is the average reading speed of an adult, taken from medium.com
        return Math.round(len / 265);
    };

    return (
        <>
            <div className="flex flex-col items-start mx-4">
                <div>
                    <button type="button" className="button">
                        Save as Draft
                    </button>
                </div>
                <div>
                    <input
                        className="text-2xl sm:text-lg font-bold border-2 p-2 border-r-4 my-2"
                        type="text"
                        name="post-title"
                        id="post-title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="flex flex-row self-stretch">
                    <textarea
                        className="lg:prose-xl border-4 flex-1 p-2 max-w-full"
                        name=""
                        id=""
                        cols="40"
                        rows="10"
                        onChange={(e) => setPostContent(e.target.value)}
                        value={postContent}
                        placeholder="Write your content..."
                    ></textarea>
                    <ReactMarkdown className="p-2 border-4 flex-1 prose lg:prose-xl markdown-content max-w-full ">
                        {postContent}
                    </ReactMarkdown>
                </div>
                <div>
                    <strong>{getWordsCount(postContent)} Minute Read</strong>
                </div>
                <label htmlFor="post-topic">Select a Topic</label>
                <select name="post-topic" id="post-topic" className="border-2">
                    <option value="None">--Choose--</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                    <option value="Health">Health</option>
                </select>
                <img src={imgSrc} width="200" />
                <label>Select Image</label>
                <input
                    id="featured-image"
                    type="file"
                    name="featured-image"
                    onChange={onImageChange}
                />
                <button
                    type="button"
                    className="button border-none hover:bg-green-600 bg-green-700 text-gray-50"
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default NewPost;
