import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { topics } from "../Dashboard";

const getWordsCount = (content) => {
    let len = content.split(" ").length;
    // 265 is the average reading speed of an adult, taken from medium.com
    return Math.round(len / 265);
};

const EditPost = ({ title = "", content = "", image = "" }) => {
    const [postContent, setPostContent] = useState(title);
    const [postTitle, setPostTitle] = useState(content);
    const [imgSrc, setImgSrc] = useState(image);
    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleKeyDown = (e) => {
        // console.log(e)
        if (e.code === "KeyS" && e.ctrlKey) {
            e.preventDefault();
            alert("Saved");
        }
    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImgSrc(URL.createObjectURL(img));
        }
    };
    return (
        <>
            <div className="w-full">
                <input
                    className="text-2xl sm:text-lg font-bold p-2 border-b-2 bg-slate-50 my-2 w-full"
                    type="text"
                    name="post-title"
                    id="post-title"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="Title..."
                />
            </div>
            <div className="flex flex-row self-stretch">
                <textarea
                    className="lg:prose-xl border-r-4 sm:border flex-1 p-2 max-w-full bg-slate-50"
                    name="post-content-input"
                    id="post-content-input"
                    cols="40"
                    rows="12"
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                    placeholder="Write your content..."
                ></textarea>
                <ReactMarkdown className="p-2 flex-1 prose lg:prose-xl markdown-content max-w-full bg-slate-100 ">
                    {postContent}
                </ReactMarkdown>
            </div>
            <div>
                <strong>{getWordsCount(postContent)} Minute Read</strong>
            </div>
            <div className="flex-col sm:flex sm:justify-between items-start w-full gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="post-topic">Select Topic</label>
                        <select
                            name="post-topic"
                            id="post-topic"
                            className="border-2"
                        >
                            <option value="None">None</option>
                            {topics.map((topic) => (
                                <option value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>
                    <div className="self-center">
                        <img src={imgSrc} width="200" />
                        <input
                            id="featured-image"
                            type="file"
                            name="featured-image"
                            onChange={onImageChange}
                        />
                    </div>
                </div>
                <button
                    type="button"
                    className="button border-none hover:bg-green-600 bg-green-700 text-gray-50 self-center my-4 py-2 px-4"
                >
                    <strong>Post</strong>
                </button>
            </div>
        </>
    );
};

export default EditPost;
