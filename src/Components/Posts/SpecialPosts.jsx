import React, { useEffect, useState } from "react";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "./PostTab";

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const SpecialPosts = ({ type }) => {
    const { setLoading, setShowMessage } = useLoading();
    const [posts, setPosts] = useState([]);
    const fetchTopPosts = async () => {
        setLoading(true);
        const res = await useAxios({ url: "/posts/top" });
        setLoading(false);
        if (res?.status) {
            setPosts(res?.data?.posts);
        } else {
            setShowMessage({
                status: "error",
                message: res?.message + "- Not able to fetch Top Posts",
            });
        }
    };
    const fetchRecommendedPosts = async() => {
        setLoading(true);
        const res = await useAxios({ url: "/post/recommended", method: "POST" });
        setLoading(false);
        if (res?.status) {
            setPosts(res?.data?.posts);
        } else {
            setShowMessage({
                status: "error",
                message: res?.message + "- Not able to fetch Recommended Posts",
            });
        }
    }
    useEffect(() => {
        //
        if (type === "top-posts") {
            // fetch differently for both and save in Posts
            fetchTopPosts();
        } else if (type === "recommended-posts") {
            // fetch the data
            fetchRecommendedPosts()
        } else if (type === "similar-posts") {
            // fetch the data
            fetchRecommendedPosts();
        }
    }, [type]);
    return (
        <div className="flex flex-col mx-auto mt-4">
            <div className="text-center text-2xl font-medium">
                {type
                    ?.split("-")
                    ?.map((e) => capitalizeFirstLetter(e))
                    ?.join(" ")}
            </div>
            <div className="m-4">
                {posts.map((post) => (
                    <PostTab key={post.id} {...post} />
                ))}
            </div>
        </div>
    );
};

export default SpecialPosts;
