import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PostTab = (props) => {
    const navigate = useNavigate();
    const {
        author,
        date,
        title,
        content,
        image,
        views,
        likes,
        comments,
        id = "",
        readingTime,
    } = props;

    const [saveLaterVisible, setSaveLaterVisible] = useState(false);
    const [listArr, setListArr] = useState([]);
    const [newListVal, setNewListVal] = useState("");

    const handleEditPost = () => {
        // move to edit page option
        navigate(`/edit-post&id=${id}`);
    };

    const handleDeletePost = () => {
        // send the request and refresh the page
        // reload the page after that
        navigate(0);
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
        if(newListVal !== ""){
            // check if another list with same name exists
            // send the data to array and get back the row of list set it in listArr
            setListArr(prev => [...prev, {id:2, name: newListVal}]);
            setNewListVal("");
        }
    };

    const handleAddPostToList = (llstId) => {
        // send the post id and list id to get saved
        // in case of correct saving
        setSaveLaterVisible(false);
    }

    return (
        <div className="flex flex-col items-start p-4 border-2 rounded-lg my-4">
            <div className="flex justify-between w-full">
                <div className="author mx-1">{author}</div>
                <div className="date mx-1">{date}</div>
                {/* show this depending on stored author id and id of the author post */}
                <div className="ml-auto">
                    <button
                        type="button"
                        className="mx-1"
                        onClick={handleEditPost}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="mx-1"
                        onClick={handleDeletePost}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <div className="title">{title}</div>
                    <p className="text-ellipsis max-h-12 overflow-hidden">
                        {content}
                    </p>
                </div>
                <img src={image} />
            </div>
            <div className="w-full flex justify-end">
                <div className="py-1 px-2 relative">
                    <button
                        type="button"
                        className="border-none underline"
                        onClick={handleSaveLater}
                    >
                        Save for Later
                    </button>
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
            <div className="flex justify-between w-full mb-2 flex-wrap">
                <p>
                    Views : <strong>{views}</strong> Likes :{" "}
                    <strong>{likes}</strong> Comments :{" "}
                    <strong>{comments}</strong>
                </p>
                <p className="">{readingTime} minute read</p>
            </div>
        </div>
    );
};

export default PostTab;
