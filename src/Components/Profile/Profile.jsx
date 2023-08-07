import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "../Posts/PostTab";
import FollowModal from "./FollowModal";
import ListTab from "./ListTab";

const Profile = (props) => {
    const { user, jwtToken } = useAuth();
    const { setLoading, setShowMessage } = useLoading();
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Home");
    const [myLists, setMyLists] = useState([]);
    const [modalVis, setModalVis] = useState(null);

    const fetchDetails = useCallback(async () => {
        setLoading(true);
        let link = "/profile";
        const res = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ id }),
        });
        setLoading(false);
        if (res?.status) {
            let data = res.data;
            setDetails(data);
        } else {
            // for error
            setShowMessage({ status: "error", message: res?.message });
        }
    }, [id]);

    const fetchAuthorPosts = async () => {
        setLoading(true);
        let link = "post/search/user_id";
        const res = await useAxios({ url: link, method: "POST", body: JSON.stringify({id})});
        setLoading(false);
        if (res?.status) {
            let data = res?.data?.posts;
            setMyPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    };

    const fetchMyLists = async () => {
        setLoading(true);

        let link = "";
        const res = await useAxios({ url: link, method: "GET" });
        setLoading(false);
        if (res?.status) {
            let data = res.data;
            setMyLists(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    };

    useEffect(() => {
        if (isNaN(parseInt(id, 10))) {
            if (!user || !jwtToken) {
                navigate("/login");
                return;
            } else {
                navigate("/dashboard");
            }
        }
        fetchDetails();
        // fetch and set the my posts based on authorId
        if (selectedOption === "Home") {
            fetchAuthorPosts();
        }
        if (selectedOption === "List") {
            // fetchMyLists()
        }
        // fetch and set the lists created
        setMyLists([
            { name: "List 1", id: 1 },
            { name: "List 2", id: 2 },
        ]);
    }, [selectedOption, id]);

    const handleFollow = async (link) => {
        if (details.id !== user.id) {
            setLoading(true);
            const res = await useAxios({
                url: `/${link.toLowerCase()}`,
                method: "POST",
                body: JSON.stringify({ id: details.id }),
            });
            setLoading(false);
            if (res?.status) {
                fetchDetails();
            } else {
                setShowMessage({
                    status: "error",
                    message: res?.message + "-" + res?.response?.statustext,
                });
            }
        }
    };
    return (
        <>
            <div className="flex flex-col m-8">
                {!!modalVis ? (
                    <FollowModal
                        modalVis={modalVis}
                        setModalVis={setModalVis}
                        {...details}
                    />
                ) : null}
                <div className="text-xl text-center">
                    <p className="text-3xl font-semibold">{details.name}</p>
                    <p className="font-light">{details.email}</p>
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
                                {details?.followed_user_ids
                                    ? details?.followed_user_ids.length
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
                                {details?.followed_by_user_ids
                                    ? details?.followed_by_user_ids.length
                                    : 0}
                            </strong>
                        </button>
                    </div>
                    {user && jwtToken ? (
                        user?.id &&
                        details?.id &&
                        user?.id == details?.id ? null : (
                            // check if it is not author and not following then show
                            <>
                                {details?.followed_by_user_ids &&
                                details?.followed_by_user_ids.indexOf(
                                    parseInt(user?.id, 10)
                                ) !== -1 ? (
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
                    {user && jwtToken ? (
                        user.id == details.id ? (
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
                            {user && jwtToken ? (
                                user.id == details.id ? (
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
                            <ListTab name="Save for Later" id="-1" />
                            {myLists.map((list) => (
                                <ListTab key={list.id} {...list} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
    // username

    // email
    // My Posts
    // Saved Posts button
};

export default Profile;
