import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Drafts = () => {
    const { user, jwtToken, setUser, setJwtToken } = useAuth();
    const navigate = useNavigate();
    const autherId = user.id;
    const [draftData, setDraftData] = useState([]);
    useEffect(() => {
        // fetch all the draft data
        setDraftData([
            {
                id: 4,
                title: "z",
                topic: "",
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                author: "blah",
                date: "23rd July, 2023",
            },
            {
                id: 5,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "25th July, 2023",
            },
            {
                id: 6,
                title: "z",
                topic: "",
                image: "",
                content: "This is the content",
                author: "blah",
                date: "29th July, 2023",
            },
        ]);
    }, []);

    return (
        <>
            <div className="flex flex-wrap gap-8 m-8">
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
