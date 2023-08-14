import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "../Posts/PostTab";
import FollowModal from "./FollowModal";
import ListTab from "./ListTab";
import { isCurrentUser } from "./Profile.helper";
import { endpoints } from "../../APIConfig/endpoint";

const Profile = (props) => {
    const { user } = useAuth();
    const { setLoading, setShowMessage } = useLoading();
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Home");
    const [myLists, setMyLists] = useState([]);
    const [connectionData, setConnectionData] = useState({
        following: [],
        followed_by: [],
    });
    const [modalVis, setModalVis] = useState(null);

    const fetchDetails = useCallback(async () => {
        setLoading(true);
        let link = endpoints.getProfile(id);
        const { res, error } = await useAxios({
            url: link,
        });
        setLoading(false);
        if (res) {
            let { profile, articles, following, followed_by } = res;
            articles = articles.filter(
                (a) => a.user_id == id && a.published_at != null
            ); // filter as per data coming from server
            setMyPosts(articles);
            setDetails(profile);
            setConnectionData((prev) => {
                let tmpObj = { ...prev };
                tmpObj["followed_by"] = followed_by;
                tmpObj["following"] = following;
                return tmpObj;
            });
        }
        if (error) {
            // for error
            setShowMessage({ status: "error", message: error?.message });
        }
    }, [id, selectedOption]);

    const fetchAuthorPosts = async () => {
        setLoading(true);
        let link = "post/search/user_id";
        const res = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ id }),
        });
        setLoading(false);
        if (res?.status) {
            let data = res?.data?.posts;
            setMyPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    };

    const fetchMyLists = useCallback(async () => {
        if (selectedOption.toLowerCase() === "list") {
            setLoading(true);
            let link = endpoints.getAllLists;
            const { res, error } = await useAxios({ url: link });
            setLoading(false);
            if (res) setMyLists(res);
            if (error)
                setShowMessage({ status: "error", message: error?.message });
        }
    }, [selectedOption]);

    useEffect(() => {
        if (isNaN(parseInt(id, 10))) {
            // to check if id is valid
            if (!user) {
                navigate("/login");
                return;
            } else {
                navigate("/dashboard");
            }
        }
        fetchDetails();
        // fetch and set the my posts based on authorId
        if (selectedOption === "Home") {
            // fetchAuthorPosts();
        }
        if (selectedOption === "List") {
            fetchMyLists();
        }
    }, [selectedOption, id]);

    const handleFollow = async (link) => {
        if (details.user_id !== user.id) {
            setLoading(true);
            const { res, error } = await useAxios({
                url: `/profiles/${details.user_id}/${link.toLowerCase()}`,
                method: link === "Follow" ? "POST" : "DELETE",
                body: JSON.stringify({ id: details.user_id }),
            });
            setLoading(false);
            if (res) {
                fetchDetails();
            }
            if (error) {
                setShowMessage({
                    status: "error",
                    message: res?.message + "-" + res?.response?.statustext,
                });
            }
        }
    };
    return (
        <>
            <div className="flex flex-col my-8 w-[90%] mx-auto am:w-[80%] md:w-[70%]">
                {!!modalVis ? (
                    <FollowModal
                        modalVis={modalVis}
                        setModalVis={setModalVis}
                        {...connectionData}
                    />
                ) : null}
                <div className="text-xl text-center">
                    <p className="text-3xl font-semibold">{details.name}</p>
                    <p className="font-light">{details.bio}</p>
                </div>
                <div
                    className="flex justify-between
                "
                >
                    <div className="flex items-center">
                        <button
                            type="button"
                            onClick={() => setModalVis("Following")}
                        >
                            Following
                            <strong>
                                {" "}
                                {connectionData?.following
                                    ? connectionData?.following.length
                                    : 0}
                            </strong>
                        </button>
                        <button
                            className="m-2"
                            type="button"
                            onClick={() => setModalVis("Followed")}
                        >
                            Followed
                            <strong>
                                {" "}
                                {connectionData?.followed_by
                                    ? connectionData?.followed_by.length
                                    : 0}
                            </strong>
                        </button>
                    </div>
                    {user ? (
                        user?.id &&
                        details?.user_id &&
                        user?.id == details?.user_id ? null : ( // current user's profile do not show any button
                            // check if it is not author and not following then show
                            <>
                                {isCurrentUser(
                                    connectionData?.followed_by,
                                    user.id
                                ) ? (
                                    <button
                                        type="button"
                                        className="bg-slate-200 text-black self-end"
                                        onClick={() => handleFollow("Unfollow")}
                                    >
                                        Unfollow
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white self-end"
                                        onClick={() => handleFollow("Follow")}
                                    >
                                        Follow
                                    </button>
                                )}
                            </>
                        )
                    ) : null}
                </div>

                <div className="flex justify-start border-b-2 py-2 my-2">
                    <button
                        type="button"
                        className={`mx-2 border-none ${
                            selectedOption === "Home" ? "underline" : ""
                        }`}
                        onClick={() => setSelectedOption("Home")}
                    >
                        Home
                    </button>
                    {user ? (
                        user.id == details.user_id ? (
                            <button
                                type="button"
                                className={`mx-2 border-none ${
                                    selectedOption === "List" ? "underline" : ""
                                }`}
                                onClick={() => setSelectedOption("List")}
                            >
                                List
                            </button>
                        ) : null
                    ) : null}
                </div>
                {selectedOption === "Home" ? (
                    <>
                        <div>
                            <p className="text-lg font-medium">
                                Author's Posts
                            </p>
                            {myPosts.map((post) => {
                                return (
                                    <div key={post.id} className="my-2">
                                        <PostTab {...post} />
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            {user ? (
                                user.id == details.user_id ? (
                                    <button
                                        onClick={() => navigate("/drafts")}
                                        type="button"
                                        className="bg-slate-400 text-white"
                                    >
                                        Drafts
                                    </button>
                                ) : null
                            ) : null}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <ListTab title="SAVE FOR LATER" id="-1" />
                            {myLists.map((list) => (
                                <ListTab key={list.id} {...list} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
