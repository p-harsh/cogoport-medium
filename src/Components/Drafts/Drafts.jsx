import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useAxios } from "../../useAxios";
const Drafts = () => {
    const { user, jwtToken, setUser, setJwtToken } = useAuth();
    const navigate = useNavigate();
    const autherId = user.id;
    const [draftData, setDraftData] = useState([]);

    const handleFetchDrafts = async () => {
        // submit to the data and fetch the comments data again
        setLoading(true);
        const res = await useAxios({
            url: "/drafts",
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        setLoading(false);
        if (res?.status) {
            setDraftData(res?.data?.posts);
        } else {
            setShowMessage({
                status: "error",
                message: "Failed to Fetch Drafts",
            });
        }
    };

    useEffect(() => {
        // fetch all the draft data
        // handleFetchDrafts()
        setDraftData([
            {
                id: 4,
                title: "z",
                topic: "",
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                author: "blah",
                date: "23rd July, 2023, 12:30 pm",
            },
            {
                id: 5,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "25th July, 2023, 12:30 pm",
            },
            {
                id: 6,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "29th July, 2023, 12:30 pm",
            },
            {
                id: 5,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "25th July, 2023, 12:30 pm",
            },
            {
                id: 6,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "29th July, 2023, 12:30 pm",
            },
        ]);
    }, []);

    return (
        <>
            <p className="font-semibold text-xl text-center mt-8 mb-4">
                Saved As Drafts
            </p>
            <div className="flex flex-wrap gap-8 w-[90%] sm:w-[80%] md:w-[70%] mx-auto">
                {draftData.map((draft) => {
                    return (
                        <>
                            <div
                                className="cursor-pointer shadow-xl p-4 rounded-lg hover:bg-slate-100"
                                onClick={() =>
                                    navigate(`/edit-draft/${draft.id}`)
                                }
                            >
                                <div className="h-[200px] w-[150px] overflow-hidden">
                                    <strong>{draft.title}</strong>
                                    <div>{draft?.content}</div>
                                </div>
                                <div className="text-sm font-light">
                                    {draft?.date}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
};

export default Drafts;
