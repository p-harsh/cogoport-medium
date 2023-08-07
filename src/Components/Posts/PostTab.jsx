import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import Image from "../../assets/image_3.png";
import { useAxios } from "../../useAxios";
import { getWordsCount } from "../EditPost/Edit.helper";
import { BookmarkSVG, DeleteSVG, EditSVG } from "../Icons/Icons";

const PostTab = (props) => {
    const { user, jwtToken } = useAuth();
    const { setShowMessage, setLoading } = useLoading();
    const navigate = useNavigate();
    const {
        title,
        body,
        user_id,
        description,
        created_at,
        updated_at,
        views,
        likes,
        comment,
        commenters,
        id,

        image_url,
    } = props;

    console.log(props);

    const [author, setAuthor] = useState({});
    const [saveLaterVisible, setSaveLaterVisible] = useState(false);
    const [listArr, setListArr] = useState([]);
    const [newListVal, setNewListVal] = useState("");

    const fetchAuthor = async (user_id) => {
        const res = await useAxios({
            url: "/profile",
            method: "POST",
            body: JSON.stringify({ id: user_id }),
        });
        console.log(res);
        if (res?.status) {
            setAuthor(res?.data);
        } else {
            setShowMessage({
                status: "error",
                message: "Failed to fetch Author data",
            });
        }
    };

    useEffect(() => {
        fetchAuthor(user_id);
    }, []);

    const handleEditPost = () => {
        // move to edit page option
        navigate(`/edit-post/${id}`);
    };

    const handleDeletePost = async () => {
        setLoading(true);
        const res = await useAxios({
            url: "/post/delete",
            method: "DELETE",
            body: JSON.stringify({ id }),
        });
        setLoading(false);
        if (res?.status) {
            navigate(0);
        } else {
            setShowMessage({
                status: "error",
                message: "Failed to Delete Post",
            });
        }
        // send the request and refresh the page
        // reload the page after that
    };
    const handleSaveLater = () => {
        if (saveLaterVisible === false) {
            // currently not visible
            // fetch from database all the lists created by the user
            setListArr([
                { name: "List 1", id: 1 },
                { name: "List 2", id: 2 },
            ]);
        }
        setSaveLaterVisible((prev) => !prev);
    };

    const handleAddToList = () => {
        if (newListVal !== "") {
            // check if another list with same name exists
            // send the data to array and get back the row of list set it in listArr
            setListArr((prev) => [...prev, { id: 2, name: newListVal }]);
            setNewListVal("");
        }
    };

    const handleAddPostToList = (llstId) => {
        // send the post id and list id to get saved
        // in case of correct saving
        setSaveLaterVisible(false);
    };

    return (
        <div className="flex flex-col items-start p-4 border-2 rounded-lg my-4">
            <div className="flex justify-between w-full text-base font-light">
                <div className="author mx-1">{author.name}</div>
                <div className="date mx-1">{created_at?.split("T")[0]}</div>
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
                    <p className="text-ellipsis">{body}</p>
                </div>
                <div className="w-3/12 m-2 max-h-24 justify-center  rounded-lg overflow-hidden shadow-sm hidden sm:flex">
                    <img src={image_url} />
                </div>
            </div>
            <div className="w-full flex justify-end items-center mt-2">
                <div className="px-1 relative">
                    {user && jwtToken ? (
                        <button
                            type="button"
                            className="underline border-2 border-slate-200 p-1"
                            onClick={handleSaveLater}
                            title="Save to List"
                        >
                            <span>
                                <BookmarkSVG className="w-[24px] h-[24px] bg-slate-50" />
                            </span>
                        </button>
                    ) : null}
                    <div
                        className={`absolute z-10 top-[48px] left-2 bg-white border-2 border-stone-200 rounded-md ${
                            saveLaterVisible ? "block" : "hidden"
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
                                {list.name}
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
                    Views : <strong>{2}</strong> Likes : <strong>{likes?.length}</strong>{" "}
                    Comments : <strong>{commenters?.length}</strong>
                </p>
                <p className="">
                    {Math.round(getWordsCount(body) / 265)} minute read
                </p>
            </div>
        </div>
    );
};

export default PostTab;
