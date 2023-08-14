import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoints } from "../../APIConfig/endpoint";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "../Posts/PostTab";
import { handleListShare } from "./List.helper";

const List = () => {
    const { id } = useParams();
    const [isCopied, setIsCopied] = useState(false);
    const [listPosts, setListPosts] = useState([]);
    const { setLoading, setShowMessage } = useLoading();

    const fetchListPosts = async () => {
        if (id == -1) {
            // fpr watch later
        } else {
            setLoading(true);
            const { res, error } = await useAxios({
                url: endpoints.getListPosts(id),
            });
            setLoading(false);
            if (res) setListPosts(res);
            if (error)
                setShowMessage({ status: "error", message: error?.message });
        }
    };

    useEffect(() => {
        // fetch based on the list id and author
        // fetch from save for later if -1
        fetchListPosts();
    }, [id]);

    return (
        <div className="flex flex-col mx-auto my-4 w-[90%] sm:w-[80%] md:w-[70%]">
            {id == -1 ? (
                <p className="text-center font-medium text-xl">
                    Saved For Later
                </p>
            ) : (
                <p className="text-center font-medium text-xl">List 2</p>
            )}

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
                <PostTab key={post.id} {...post} />
            ))}
        </div>
    );
};

export default List;
