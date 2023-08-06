import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import { FavoriteIcon } from "../Icons/Icons";
import getStripe from "../Stripe/getStripe";
import CommentTab from "./CommentTab";
import {
    isUserPlanAllowed,
    postsReadDbInit,
    updateReadList,
} from "./PostDetail.helper";

const PostDetail = () => {
    const modalRef = useRef(null);
    const { setLoading, setShowMessage } = useLoading();
    const { user, jwtToken } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [postDetail, setPostDetail] = useState({});
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [writtenCommentValue, setWrittenCommentValue] = useState("");

    const handleModalOpening = () => {
        setShowPriceModal(true);
        modalRef.current.showModal();
    };

    const fetchPostDetails = async () => {
        setLoading(true);
        let link = "/post/id";
        const res = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        setLoading(false);
        if (res?.status) {
            setPostDetail(res?.data?.post);
        } else {
            setShowMessage({
                status: "error",
                message: "Failed to Get Post Details",
            });
        }
    };

    useEffect(() => {
        // fetch the data of post
        // look at number of posts read today
        let postsReadList = postsReadDbInit();
        // check how many posts are allowed from the local storage and have and array of 10 posts for this
        // check which plan user is on
        if (!isUserPlanAllowed(postsReadList)) {
            handleModalOpening();
            return;
        }

        postsReadList = updateReadList(postsReadList);
        fetchPostDetails();
        // fetch post details based on Id
    }, [id]);

    const handleCommentPost = async (e) => {
        // submit to the data and fetch the comments data again
        if (writtenCommentValue !== "") {
            setLoading(true);
            const res = await useAxios({
                url: "/post/comment",
                method: "POST",
                body: JSON.stringify({ id: id, comment: writtenCommentValue }),
            });
            setLoading(false);
            if (res?.status) {
                fetchPostDetails();
            } else {
                setShowMessage({
                    status: "error",
                    message: "Failed to Comments",
                });
            }
        }
        setWrittenCommentValue("");
    };

    const handlePostLike = async () => {
        // send the data for like
        // fetch the data again
        if (postDetail?.likes.find((e) => e == user.id)) {
            // go to unlike
            const res = await useAxios({
                url: "/post/unlike",
                method: "POST",
                body: JSON.stringify({ id: id }),
            });
            if (res?.status) {
                fetchPostDetails();
            } else {
                setShowMessage({
                    status: "error",
                    message: "Failed to Like the Image",
                });
            }
        } else {
            // go to like
            // go to unlike
            const res = await useAxios({
                url: "/post/like",
                method: "POST",
                body: JSON.stringify({ id: id }),
            });
            if (res?.status) {
                fetchPostDetails();
            } else {
                setShowMessage({
                    status: "error",
                    message: "Failed to Unlike the Image",
                });
            }
        }
    };

    async function handleCheckout(price) {
        if (!user || !jwtToken) {
            setShowMessage({ status: "error", message: "Signup First!!" });
            navigate("/signup");
            return;
        }
        const priceKeyMap = {
            30: "price_1NbUTVSFG1cPP0H62ZS3onG1",
            50: "price_1NbUTVSFG1cPP0H64vzWVDhQ",
            100: "price_1NbUTVSFG1cPP0H6DZwSCln4",
        };
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: priceKeyMap[price],
                    quantity: 1,
                },
            ],
            mode: "subscription",
            successUrl: `http://localhost:5173/payment-success/${price}`,
            cancelUrl: `http://localhost:5173/dashboard`,
            customerEmail: "customer@email.com",
        });
        console.warn(error.message);
    }

    return (
        <>
            <div className="flex flex-col items-center w-11/12 m-auto">
                {/* pricing modal */}
                <dialog
                    ref={modalRef}
                    // open={showPriceModal}
                    className={`${showPriceModal ? "flex" : "hidden"}`}
                >
                    <button
                        type="button"
                        className="self-end"
                        onClick={() => {
                            navigate(-1);
                            setShowPriceModal(false);
                            ref.current.close();
                        }}
                    >
                        ╳
                    </button>
                    <p class="text-center font-medium">
                        Oops, want to read more
                    </p>
                    <p class="text-center font-medium">
                        Select a Pricing Modal
                    </p>
                    <div className="flex flex-wrap justify-center w-full mx-auto">
                        <div
                            className="w-[100px] p-2 m-2 border-2 border-slate-100 rounded-lg shadow-md cursor-pointer hover:bg-slate-100"
                            onClick={() => handleCheckout(30)}
                        >
                            30 Rupees for 3 Posts per day
                        </div>
                        <div
                            className="w-[100px] p-2 m-2 border-2 border-slate-100 rounded-lg shadow-md cursor-pointer hover:bg-slate-100"
                            onClick={() => handleCheckout(50)}
                        >
                            50 Rupees for 5 Posts per day
                        </div>
                        <div
                            className="w-[100px] p-2 m-2 border-2 border-slate-100 rounded-lg shadow-md cursor-pointer hover:bg-slate-100"
                            onClick={() => handleCheckout(100)}
                        >
                            100 Rupees for 10 Posts per day
                        </div>
                    </div>
                </dialog>
                <p className="title block text-center text-4xl font-bold my-2">
                    {postDetail?.title}
                </p>
                {postDetail?.image_url ? (
                    <div className="w-[200px]">
                        <img src={postDetail?.image_url} />
                    </div>
                ) : null}
                <ReactMarkdown className="p-4 bg-gray-100 flex-1 prose rounded-lg lg:prose-xl markdown-content max-w-none">
                    {postDetail?.content}
                </ReactMarkdown>
                <div className="flex justify-between w-full my-2 flex-wrap">
                    <p>
                        Views : <strong>{postDetail?.views}</strong>
                        <strong className="flex items-center">
                            <button
                                className={`p-[2px] border-none cursor-pointer mr-2`}
                                onClick={handlePostLike}
                            >
                                <FavoriteIcon
                                    style={{ cursor: "pointer" }}
                                    fill={`${
                                        postDetail?.likes &&
                                        postDetail?.likes.find(
                                            (e) => e == user.id
                                        )
                                            ? "red"
                                            : "black"
                                    }`}
                                />
                            </button>{" "}
                            {postDetail?.likes?.length}
                        </strong>
                    </p>
                    <div className="flex flex-col items-end">
                        {/* <p>
                            Author : <strong>{postDetail?.author}</strong>{" "}
                        </p> */}
                        <p>
                            Published On :{" "}
                            <strong>
                                {postDetail?.updated_at?.split("T")[0]}
                            </strong>
                        </p>
                    </div>
                </div>

                {user && jwtToken ? (
                    <>
                        <div className="self-stretch">
                            {/* <Comments/> */}
                            <p className="text-lg font-semibold">
                                Comments ({postDetail?.commenters?.length})
                            </p>
                            {postDetail?.comment?.map((comment, ind) => (
                                <CommentTab
                                    author={postDetail?.commenters[ind]}
                                    text={postDetail?.comment[ind]}
                                />
                            ))}
                        </div>
                        <div className="flex self-stretch">
                            <input
                                type="text"
                                className="w-full flex-1 p-4 border-2 rounded-md"
                                placeholder="Enter a Comment..."
                                value={writtenCommentValue}
                                onChange={(e) =>
                                    setWrittenCommentValue(e.target.value)
                                }
                            />
                            <button
                                type="button"
                                className="self-center ml-4 bg-slate-200"
                                onClick={handleCommentPost}
                            >
                                Post
                            </button>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
};

export default PostDetail;
