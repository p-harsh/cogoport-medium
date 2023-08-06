import React, { useEffect, useState } from "react";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "./PostTab";

export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const SpecialPosts = ({ type }) => {
    const { setLoading } = useLoading();
    const [posts, setPosts] = useState([]);
    const fetchTopPosts = async () => {
        // setLoading(true);
        // const res = useAxios({url: '/posts/top'})
        // if(res?.status){
        setPosts([
            [
                {
                    id: 2,
                    title: "10 best posts to be greate developer",
                    created_at: "2023-08-06T08:41:08.842Z",
                    updated_at: "2023-08-06T12:43:57.049Z",
                    image_url: null,
                    topic: "Javascript",
                    description:
                        "Have you ever thought about why some CSS properties are not getting applied, although you’re doing everything correctly? Well, that may be due to CSS Selector Precedence. The CSS selector precedence hierarchy can be summarized as follows, from highest to lowest:",
                    body: "Have you ever thought about why some CSS properties are not getting applied, although you’re doing everything correctly? Well, that may be due to CSS Selector Precedence. The CSS selector precedence hierarchy can be summarized as follows, from highest to lowest: Inline Styles: Styles applied directly to an HTML element using the style attribute. Inline styles have the highest precedence and override all other styles Internal Styles: These styles gets higher priority than external CSS styles but less than the inline style. ID Selectors: Selectors target elements by their unique ID attribute using the # symbol. ID selectors have higher precedence than class and tag selectors.Class Selectors: Selectors target elements by their class attributes using the . symbol.",
                    comment: ["hello", "Good Well Done"],
                    commenters: ["hello", "John Doe"],
                    likes: ["hello"],
                    user_id: 1,
                    views: null,
                },
                {
                    id: 4,
                    title: "This is the new post with a image attached and topic as well",
                    created_at: "2023-08-06T10:36:38.124Z",
                    updated_at: "2023-08-06T13:27:06.582Z",
                    image_url:
                        "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--680ce20cbf84a15c2cc35da065c4bef9bc0870bf/Captured20230803102939463.jpg",
                    topic: "Typescript",
                    description:
                        "ost with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
                    body: "This is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
                    comment: ["hello", "Well done!!"],
                    commenters: ["hello", "John Doe"],
                    likes: ["hello"],
                    user_id: 1,
                    views: null,
                },
                {
                    id: 5,
                    title: "This is the new post with a image attached and topic as well",
                    created_at: "2023-08-06T12:32:32.749Z",
                    updated_at: "2023-08-06T12:32:32.881Z",
                    image_url:
                        "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b605b49464c62eb0e6d89388e503b3364fe140dd/anxiety_vs_reaction.png",
                    topic: "Food",
                    description:
                        "ost with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
                    body: "This is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
                    comment: ["hello"],
                    commenters: ["hello"],
                    likes: ["hello"],
                    user_id: 1,
                    views: null,
                },
            ],
        ]);
        // }
        // else{

        // }
    };
    useEffect(() => {
        //
        if (type === "top-posts") {
            // fetch differently for both and save in Posts
            fetchTopPosts();
        } else if (type === "recommended-posts") {
            // fetch the data
        } else if (type === "similar-posts") {
            // fetch the data
        }
        setPosts([
            {
                id: 1,
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
                authorId: 1,
            },
            {
                id: 2,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
                authorId: 2,
            },
            {
                id: 3,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "31st July, 2023",
                author: "blah",
                authorId: 1,
            },
        ]);
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
                    <PostTab {...post} />
                ))}
            </div>
        </div>
    );
};

export default SpecialPosts;
