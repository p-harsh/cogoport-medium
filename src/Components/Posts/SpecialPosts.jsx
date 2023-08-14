import React, { useEffect, useState } from "react";
import { endpoints } from "../../APIConfig/endpoint";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { TOPICS } from "../../constants";
import { useAxios } from "../../useAxios";
import PostTab from "./PostTab";

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const SpecialPosts = ({ type }) => {
    const { setLoading, setShowMessage } = useLoading();
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const fetchTopPosts = async () => {
        setLoading(true);
        const { res, error } = await useAxios({ url: endpoints.topPosts });
        setLoading(false);
        if (res) {
            setPosts(res);
        }
        if (error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
    };

    const findRecommendedPosts = (res) => {
        let tmpRes = [...res];
        res = res.filter((post) => post.user_id == user.id); // all posts of the user
        let userTopics = {}; // contain all the topics on which user has written
        TOPICS.forEach((topic) => (userTopics[topic] = 0)); // set all topic to be 0
        res.forEach((post) => {
            userTopics[post.topic]++;
        });
        console.log("RES", res, userTopics);
        res = tmpRes.filter(
            (post) => post.user_id !== user.id && userTopics[post?.topic] > 0
        );
        return res;
    };

    const fetchSimilarPosts = async () => {
        setLoading(true);
        let { res, error } = await useAxios({
            // url: endpoints.recommendedPosts,
            // use above when better algorithm in server is implemented
            url: endpoints.getAllPosts,
        });
        setLoading(false);
        if (res) setPosts(findRecommendedPosts(res));
        if (error) {
            setShowMessage({
                status: "error",
                message: res?.message + "- Not able to fetch Recommended Posts",
            });
        }
    };
    useEffect(() => {
        //
        if (type === "top-posts") {
            // fetch differently for both and save in Posts
            fetchTopPosts();
        } else if (type === "recommended-posts") {
            // fetch the data, currently not available
            // fetchRecommendedPosts();
            fetchSimilarPosts();
        } else if (type === "similar-posts") {
            // fetch the data
            fetchSimilarPosts();
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
            <div className="m-4 w-[90%] md:w-[70%] sm-[80%] mx-auto">
                {posts.map((post) => (
                    <PostTab key={post.id} {...post} />
                ))}
            </div>
            {posts.length === 0 ? (
                <p className="text-center text-xl font-normal">
                    No Posts Found
                </p>
            ) : null}
        </div>
    );
};

export default SpecialPosts;
