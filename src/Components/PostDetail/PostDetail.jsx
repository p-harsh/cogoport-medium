import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import CommentTab from "./CommentTab";

export const FavoriteIcon = ({ fill, classname }) => (
    <svg
        fill={fill}
        className={classname}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
    >
        <path d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z" />
    </svg>
);

const PostDetail = () => {
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState({});
    const [comments, setComments] = useState([
        {
            date: "24th July 2023",
            author: "Harsh Patel",
            text: "This is good!!",
        },
        {
            date: "26th July 2023",
            author: "Patel",
            text: "This is bad!!",
        },
        {
            date: "29th July 2023",
            author: "Harsh",
            text: "This could be better!!",
        },
    ]);
    useEffect(() => {
        // fetch the data of post
        setPostDetail({
            id: 1,
            title: "z",
            topic: [],
            image: "",
            content:
                "This is the contentThis is the contentThis is the content\nThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content \n # ref",
            dateTime: "29th July, 2023, 12:24pm",
            author: "blah",
            likes: 24,
            comments: 3,
            views: 35,
        });
    }, []);

    const handleCommentPost = () => {
        // submit to the data and fetch the comments data again
    };
    const handlePostLike = () => {
        // send the data for like
        // fetch the data again
    };
    return (
        <>
            <div className="flex flex-col items-center w-11/12 m-auto">
                <p className="title block text-center text-4xl font-bold my-2">
                    {postDetail?.title}
                </p>
                {postDetail?.image ? (
                    <img width="100%" src={postDetail?.image} />
                ) : null}
                <ReactMarkdown className="p-4 bg-gray-100 flex-1 prose rounded-lg lg:prose-xl markdown-content max-w-none">
                    {postDetail?.content}
                </ReactMarkdown>
                <div className="flex justify-between w-full my-2 flex-wrap">
                    <p>
                        Views : <strong>{postDetail?.views}</strong>
                        <strong className="flex items-center">
                            <button
                                className="p-[2px] border-none cursor-pointer mr-2"
                                onClick={handlePostLike}
                            >
                                <FavoriteIcon style={{ cursor: "pointer" }} />
                            </button>{" "}
                            {postDetail?.likes}
                        </strong>
                    </p>
                    <div className="flex flex-col items-end">
                        <p>
                            Author : <strong>{postDetail?.author}</strong>{" "}
                        </p>
                        <p>
                            Published On :{" "}
                            <strong>{postDetail?.dateTime}</strong>
                        </p>
                    </div>
                </div>

                <div className="self-stretch">
                    {/* <Comments/> */}
                    <p className="text-lg font-semibold">
                        Comments ({postDetail?.comments})
                    </p>
                    {comments.map((comment) => (
                        <CommentTab {...comment} />
                    ))}
                </div>
                <div className="flex self-stretch">
                    <input
                        type="text"
                        className="w-full flex-1 p-4 border-2 rounded-md"
                        placeholder="Enter a Comment..."
                    />
                    <button
                        type="button"
                        className="self-center ml-4 bg-slate-200"
                        onClick={handleCommentPost}
                    >
                        Post
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
