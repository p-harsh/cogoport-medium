import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLocation } from "react-router-dom";
import { useLoading } from "../../Context/LoadingContext";
import Image from "../../assets/image_1.jpg";
import { TOPICS } from "../../constants";
import { useAxios } from "../../useAxios";
import { debounce } from "../../utils";
import { getWordsCount } from "./Edit.helper";

const EditPost = ({ title = "", content = "", image = "", type = "post" }) => {
    const { setLoading, setShowMessage } = useLoading();
    const location = useLocation();
    const postid = location.pathname.split("/")[2];
    // const location = useLocation()
    const [previousVersVis, setPreviousVersVis] = useState(false);
    const [prevVerList, setPrevVerList] = useState([]);
    const [postContent, setPostContent] = useState(content);
    const [postTitle, setPostTitle] = useState(title);
    const [imgSrc, setImgSrc] = useState(Image);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const debouncedSaving = useCallback(
        debounce(() => handleSaveAsDraft()),
        []
    );

    const handleSaveAsDraft = async () => {
        if (postid == -1 && type === "post") {
            // saving new post or already drafted one
            const res = await useAxios({});
            if (res?.status) {
                setShowMessage({ status: "success", message: "Saved" });
                // move to drafted area
            } else
                setShowMessage({ status: "error", message: "Failed Saving" });
        } else {
            // save the already drafted post
            const res = await useAxios({});
            if (res?.status) {
                setShowMessage({ status: "success", message: "Saved" });
            } else {
                setShowMessage({ status: "error", message: "Failed Saving" });
            }
        }
    };

    const handleKeyDown = (e) => {
        // console.log(e)
        if (e.code === "KeyS" && e.ctrlKey) {
            e.preventDefault(); // prevent saving of HTML page
            debouncedSaving();
        }
    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImgSrc(URL.createObjectURL(img));
        }
    };

    const handlePreviousVer = () => {
        // fetch the data and save it in previousVersion data state
        setPrevVerList([
            { id: 1, date: "28th July, 12:30pm" },
            { id: 2, date: "27th July, 10:30am" },
            { id: 1, date: "28th July, 12:30pm" },
            { id: 2, date: "27th July, 10:30am" },
        ]);
        setPreviousVersVis(true);
    };

    return (
        <>
            <div className="flex justify-between w-full">
                {type === "draft" || (type === "post" && postid == -1) ? (
                    <button
                        type="button"
                        className="button"
                        onClick={handleSaveAsDraft}
                    >
                        Save as Draft
                    </button>
                ) : null}
                {type === "draft" ? (
                    <button
                        type="button"
                        className="border-none underline font-light"
                        onClick={handlePreviousVer}
                    >
                        Previous Versions
                    </button>
                ) : null}
            </div>
            <div className="w-full">
                <input
                    className="text-2xl sm:text-lg font-bold p-2 border-b-2 bg-slate-50 my-2 w-full"
                    type="text"
                    name="post-title"
                    id="post-title"
                    value={postTitle}
                    onChange={(e) => {
                        debouncedSaving();
                        setPostTitle(e.target.value);
                    }}
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
                    onChange={(e) => {
                        debouncedSaving();
                        setPostContent(e.target.value);
                    }}
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
                            {TOPICS.map((topic) => (
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
            <dialog
                open={previousVersVis ? "open" : false}
                className={`${previousVersVis ? "flex" : ""}`}
            >
                <button
                    type="button"
                    className="self-center"
                    onClick={() => setPreviousVersVis(false)}
                >
                    ╳
                </button>
                {prevVerList.map((prevVers) => {
                    return (
                        <a
                            href={`/edit-draft?id=${prevVers.id}`}
                            onClick={() => {
                                setPostId(prevVers.id);
                                setPreviousVersVis(false);
                            }}
                        >
                            <p className="p-1 border-b-2 border-slate-200 hover:bg-slate-100">
                                Saved on {prevVers.date}
                            </p>
                        </a>
                    );
                })}
            </dialog>
        </>
    );
};

export default EditPost;
