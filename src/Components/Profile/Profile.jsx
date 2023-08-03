import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostTab from "../Posts/PostTab";
import ListTab from "./ListTab";

const Profile = (props) => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [myPosts, setMyPosts] = useState([]);
    const [selectedOption, setSelectedOption] = useState("Home");
    const [myLists, setMyLists] = useState([]);

    useEffect(() => {
        // fectch details from the token or somethin
        setDetails({
            name: "Harsh Patel",
            username: "p-harsh",
        });
        // fetch and set the my posts based on authorId
        setMyPosts([
            {
                id: 1,
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
                likes: 24,
                comments: 25,
                views: 35,
                readingTime: 2,
            },
            {
                id: 2,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
                likes: 2,
                comments: 5,
                views: 5,
                readingTime: 4,
            },
        ]);
        // fetch and set the lists created
        setMyLists([
            { name: "List 1", id: 1 },
            { name: "List 2", id: 2 },
        ]);
    }, [selectedOption]);
    return (
        <>
            <div className="flex flex-col m-8">
                <div className="text-xl text-center">
                    <p className="text-3xl font-semibold">{details.name}</p>
                    <p className="font-light">@{details.username}</p>
                </div>
                {
                    // check if it is not author and not following then show
                    <>
                        <button
                            type="button"
                            className="bg-blue-500 text-white self-end"
                        >
                            Follow
                        </button>
                        {/* <button
                            type="button"
                            className="bg-slate-500 text-white self-end"
                        >
                            Following
                        </button> */}
                    </>
                }

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
                    <button
                        type="button"
                        className={`mx-2 border-none ${
                            selectedOption === "List" ? "underline" : ""
                        }`}
                        onClick={() => setSelectedOption("List")}
                    >
                        List
                    </button>
                </div>
                {selectedOption === "Home" ? (
                    <>
                        <div>
                            <p className="text-lg font-medium">
                                Author's Posts
                            </p>
                            {myPosts.map((post) => {
                                return (
                                    <div className="my-2">
                                        <PostTab {...post} />
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="bg-slate-400 text-white"
                            >
                                Saved Posts
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col">
                            <ListTab name="Save for Later" id="-1" />
                            {myLists.map((list) => (
                                <ListTab {...list} />
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
