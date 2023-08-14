import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import { getWordsCount } from "../EditPost/Edit.helper";
import { BookmarkSVG, DeleteSVG, EditSVG } from "../Icons/Icons";
import { endpoints } from "../../APIConfig/endpoint";

const PostTab = (props) => {
    const { user } = useAuth();
    const { setShowMessage, setLoading } = useLoading();
    const navigate = useNavigate();
    const {
        // "file"
        author = "",
        published_at = "",
        title = "",
        user_id,
        description = "",
        created_at = "",
        updated_at = "",
        views = 0,
        likes = [],
        comment = [],
        commenters = [],
        id,
        image_url = null,
        topic = "None",
        minutes_to_read = 0,
        post_comments = 0,
        post_likes = 0,
    } = props;

    // const [author, setAuthor] = useState({});
    const [listsContainVisible, setListsContainVisible] = useState(false);
    const [listArr, setListArr] = useState([]);
    const [newListVal, setNewListVal] = useState("");

    useEffect(() => {
        // fetchAuthor(user_id);
    }, []);

    const handleEditPost = () => {
        // move to edit page option
        navigate(`/edit-post/${id}`);
    };

    const handleDeletePost = async () => {
        setLoading(true);
        const { res, error } = await useAxios({
            url: endpoints.deletePost,
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        setLoading(false);
        if (res) {
            navigate(0);
        }
        if (error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
        // send the request and refresh the page
        // reload the page after that
    };
    const fetchAllLists = async () => {
        const { res, error } = await useAxios({ url: endpoints.getAllLists });
        if (res) setListArr(res);
        if (error) setShowMessage({ status: "error", message: error?.message });
    };
    const handleLists = () => {
        if (listsContainVisible === false) {
            // currently not visible
            // fetch from database all the lists created by the user
            fetchAllLists();
        }
        setListsContainVisible((prev) => !prev);
    };

    const addToTheList = async (listName) => {
        setLoading(true);
        const { res, error } = await useAxios({
            url: endpoints.addList,
            method: "POST",
            body: JSON.stringify({ playlist: { title: listName } }),
        });
        setLoading(false);
        if (res) {
            setListArr((prev) => [...prev, res]);
            setNewListVal("");
            setShowMessage({
                status: "Success",
                message: "List Added Succesfully",
            });
        }
        if (error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
    };

    const handleAddToList = async () => {
        if (newListVal !== "") {
            // check if another list with same name exists
            if (listArr.find((list) => list.title === newListVal)) {
                // can also check for save for later named list
                setShowMessage({
                    status: "error",
                    message: "Can't add list with same name",
                });
                return;
            }
            // send the data to array and get back the row of list set it in listArr
            await addToTheList(newListVal);
        } else {
            setShowMessage({ status: "error", message: "List can't be blank" });
        }
    };

    const addPostToList = async (listId) => {
        setLoading(true);
        const {res,error} = await useAxios({
            url: endpoints.addPostToList,
            method: "POST",
            body: JSON.stringify({ article_id: id, playlist_id: listId }),
        });
        setLoading(false);
        if (res) {
            setShowMessage({
                status: "Success",
                message: res?.message,
            });
        }
        if (error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
    };

    const handleAddPostToList = async (listId) => {
        // send the post id and list id to get saved
        await addPostToList(listId);
        // in case of correct saving
        setListsContainVisible(false);
    };

    return (
        <div className="flex flex-col items-start p-4 border-2 rounded-lg my-4">
            <div className="flex justify-between w-full text-base font-light">
                <div className="author mx-1">{author}</div>
                <div className="date mx-1 border-l-2 pl-2">
                    {published_at &&
                        new Date(published_at).toLocaleDateString()}
                </div>
                <div className="date mx-1 font-medium border-l-2 border-slate-200 pl-2">
                    {topic}
                </div>
                {/* show this depending on stored author id and id of the author post */}
                <div className="ml-auto">
                    {user_id == user?.id ? (
                        <>
                            <button
                                type="button"
                                className="mx-1 border-slate-200"
                                onClick={handleEditPost}
                                title="Edit Post"
                            >
                                <span>
                                    <EditSVG className="w-[24px] h-[24px]" />
                                </span>
                            </button>

                            <button
                                type="button"
                                className="mx-1 border-slate-200"
                                onClick={handleDeletePost}
                                title="Delete Post"
                            >
                                <span>
                                    <DeleteSVG
                                        className="w-[24px] h-[24px]"
                                        fill="#474747"
                                    />
                                </span>
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
            <div className="flex w-full max-h-24 overflow-hidden text-ellipsis">
                <div className="w-full sm:w-9/12">
                    <div className="font-semibold text-lg">{title}</div>
                    <p className="text-ellipsis">{description}</p>
                </div>
                <div className="w-3/12 m-2 max-h-24 justify-center  rounded-lg overflow-hidden shadow-sm hidden sm:flex">
                    <img src={image_url} />
                </div>
            </div>
            <div className="w-full flex justify-end items-center mt-2">
                <div className="px-1 relative">
                    {user ? (
                        <button
                            type="button"
                            className="underline border-2 border-slate-200 p-1"
                            onClick={() => handleLists()}
                            title="Save to List"
                        >
                            <span>
                                <BookmarkSVG className="w-[24px] h-[24px] bg-slate-50" />
                            </span>
                        </button>
                    ) : null}
                    <div
                        className={`absolute z-10 top-[48px] left-2 bg-white border-2 border-stone-200 rounded-md ${
                            listsContainVisible ? "block" : "hidden"
                        }`}
                    >
                        <p
                            className="p-1 px-2 border-b-2 cursor-pointer hover:bg-slate-100"
                            onClick={() => handleAddPostToList(-1)}
                        >
                            Save for Later
                        </p>
                        {listArr.map((list) => (
                            <p
                                key={list.id}
                                className="p-1 px-2 border-b-2 cursor-pointer hover:bg-slate-100"
                                onClick={() => handleAddPostToList(list.id)}
                            >
                                {list.title}
                            </p>
                        ))}
                        <p className="p-1 px-2 border-b-2 flex flex-col justify-end">
                            <input
                                type="text"
                                placeholder="Create list.."
                                className="flex-1"
                                value={newListVal}
                                onChange={(e) => setNewListVal(e.target.value)}
                            />
                            <button
                                type="button"
                                className="border-none bg-stone-300 m-2 flex-1"
                                onClick={handleAddToList}
                            >
                                Add
                            </button>
                        </p>
                    </div>
                </div>
                <button
                    type="button"
                    className="button py-[0.5px] px-2 font-semibold border-none underline"
                >
                    <Link to={`/post/${id}`}>Read More</Link>
                </button>
            </div>
            <div className="flex justify-between w-full mb-2 flex-wrap text-base font-light">
                <p>
                    Views : <strong>{views}</strong> | Likes :{" "}
                    <strong>{post_likes}</strong> | Comments :{" "}
                    <strong>{post_comments}</strong>
                </p>
                <p className="">
                    {/* {Math.round(getWordsCount(description) / 265)}  */}
                    {minutes_to_read} minute{minutes_to_read > 1 ? "s" : ""}{" "}
                    read
                </p>
            </div>
        </div>
    );
};

export default PostTab;
