import React, { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, endpoints } from "../../APIConfig/endpoint";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { TOPICS } from "../../constants";
import { useAxios } from "../../useAxios";
import { debounce } from "../../utils";
import { getDataInJSON, getWordsCount } from "./Edit.helper";

const EditPost = ({
    type,
    title = "",
    body = "",
    topic = "None",
    views = 0,
    comment = [],
    commenters = [],
    id,
    image_url = null,
    // "file"
    author = "",
    published_at = "",
    user_id,
    description = "",
    created_at = "",
    updated_at = "",
    minutes_to_read = 0,
    post_comments = 0,
    post_likes = 0,
    revision = false,
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { setLoading, setShowMessage } = useLoading();
    const { postId } = useParams();
    const location = useLocation();
    const [previousVersVis, setPreviousVersVis] = useState(false);
    const [prevVerList, setPrevVerList] = useState([]);
    const [postContent, setPostContent] = useState(description);
    const [postTitle, setPostTitle] = useState(title);
    const [postTopic, setPostTopic] = useState(topic);
    const [imgSrc, setImgSrc] = useState(image_url);
    const [image, setImage] = useState(null);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [postId]);

    const debouncedSaving = useCallback(
        // debounce(() => handleSaveAsDraft()),
        debounce(() => {
            console.log("Autosave");
        }),
        [postTitle, postContent, postTopic, image, user]
    );

    const postDraft = async (data) => {
        if (postId == -1 && type === "post") {
            // save in a new draft
            let link = `${BASE_URL}${endpoints.createPost}`;
            setLoading(true);
            await fetch(link, {
                method: "POST",
                body: data,
                credentials: "include",
            })
                .then((res) => res.json())
                .then((res) => {
                    window.location.href =
                        window.location.origin + `/edit-draft/${res.id}`;
                    setShowMessage({
                        status: "success",
                        message: "Draft Saved Successfully",
                    });
                })
                .catch((err) => {
                    setShowMessage({
                        status: "error",
                        message: err?.message,
                    });
                })
                .finally(() => setLoading(false));
        } else {
            // update the already saved draft
            let bodyObj;
            if (revision)
                // for saving revisions, their postId is the article Id
                bodyObj = getDataInJSON(data, postId);
            else bodyObj = getDataInJSON(data, id);
            let link = `${BASE_URL}${endpoints.updatePost}`;
            setLoading(true);
            const { res, error } = await useAxios({
                url: link,
                method: "PUT",
                body: JSON.stringify(bodyObj),
            });
            setLoading(false);
            if (res) {
                setShowMessage({
                    status: "success",
                    message: "Draft Updated Successfully",
                });
            }
            if (error) {
                setShowMessage({
                    status: "error",
                    message: error?.message,
                });
            }
        }
    };

    const handleSaveAsDraft = () => {
        if (postId == -1 && type === "post") {
            // draft saving a new post
            // save new post but with publlished_at is NULL
            let data = getFormData(true);
            postDraft(data);
        } else {
            // save the already drafted post
            // update the drafted post
            let data = getFormData(true);
            postDraft(data);
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
            setImage(img);
            setImgSrc(URL.createObjectURL(img));
        }
    };

    const fetchPreviousVersion = async () => {
        setLoading(true);
        const { res, error } = await useAxios({
            url: endpoints.getRevisionDraft,
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        setLoading(false);
        if (res) setPrevVerList(res);
        if (error) setShowMessage({ status: "error", message: error?.message });
    };
    const handlePreviousVer = () => {
        // fetch the data and save it in previousVersion data state
        fetchPreviousVersion();
        setPreviousVersVis(true);
    };

    const sendToAPI = async (data) => {
        let link;
        if (postId != -1 && !revision) {
            // updating/republishing a post
            let bodyObj = getDataInJSON(data, id);
            link = `${BASE_URL}${endpoints.updatePost}`;
            setLoading(true);
            const { res, error } = await useAxios({
                url: link,
                method: "PUT",
                body: JSON.stringify(bodyObj),
            });
            setLoading(false);
            if (res) {
                navigate("/dashboard");
                setShowMessage({
                    status: "success",
                    message: "Successfully Updated",
                });
            }
            if (error) {
                setShowMessage({
                    status: "error",
                    message: error?.message,
                });
            }
            return;
        } else {
            // submitting a new post/draft
            link = `${BASE_URL}${endpoints.createPost}`;
            await fetch(link, {
                method: "POST",
                body: data,
                credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => {
                    navigate("/dashboard");
                    setShowMessage({
                        status: "success",
                        message: "Post Created Successfully",
                    });
                })
                .catch((err) => {
                    setShowMessage({
                        status: "error",
                        message: err?.message,
                    });
                })
                .finally(() => setLoading(false));
        }
    };

    const getFormData = (isDraft = false) => {
        let formData = new FormData();
        formData.append("title", postTitle);
        formData.append("topic", postTopic);
        if (image) formData.append("file", image);
        formData.append("description", postContent);
        // do not have direct access to the author name
        formData.append("author", user.email.split("@")[0]);
        formData.append("user_id", user.id);
        if (!isDraft) formData.append("published_at", new Date());
        return formData;
    };

    const handlePostSubmit = async () => {
        if (postTitle === "") {
            setShowMessage({
                status: "error",
                message: "Title Can't be blank",
            });
            return;
        } else if (postContent === "") {
            setShowMessage({
                status: "error",
                message: "Post Content can't be blank",
            });
            return;
        }
        const data = getFormData(false);
        sendToAPI(data);
    };

    return (
        <>
            <div className="flex justify-between w-full">
                {type === "draft" || (type === "post" && postId == -1) ? (
                    <button
                        type="button"
                        className="button"
                        onClick={handleSaveAsDraft}
                    >
                        Save as Draft
                    </button>
                ) : null}
                {type === "draft" && !revision ? (
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
                            onChange={(e) => setPostTopic(e.target.value)}
                            value={postTopic}
                        >
                            <option value="None">None</option>
                            {TOPICS.map((topic) => (
                                <option key={topic} value={topic}>
                                    {topic}
                                </option>
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
                    onClick={handlePostSubmit}
                >
                    <strong>
                        {postId != -1 &&
                        location.pathname.indexOf("edit-post") != -1 // location pathname like /edit-post/1, /edit-post/2
                            ? "Update"
                            : "Publish"}
                    </strong>
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
                        <Link
                            to={`/edit-revision/${prevVers.article_id}/${prevVers.id}`}
                            onClick={() => setPreviousVersVis(false)}
                        >
                            <p className="p-1 border-b-2 border-slate-200 hover:bg-slate-100">
                                {prevVers.title} - Saved on{" "}
                                {new Date(prevVers.updated_at).toLocaleString()}
                            </p>
                        </Link>
                    );
                })}
            </dialog>
        </>
    );
};

export default EditPost;
