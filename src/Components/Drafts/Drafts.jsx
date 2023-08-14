import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../APIConfig/endpoint";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
const Drafts = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const { setLoading, setShowMessage } = useLoading();
    const [draftData, setDraftData] = useState([]);

    const handleFetchDrafts = async () => {
        // submit to the data and fetch the comments data again
        setLoading(true);
        let { res, error } = await useAxios({
            url: endpoints.getAllDrafts
        });
        setLoading(false);
        if (res) {
            res = res.filter((draft) => draft.user_id == user.id);
            setDraftData(res);
        }
        if (error)
            setShowMessage({
                status: "error",
                message: error?.message,
            });
    };

    useEffect(() => {
        // fetch all the draft data
        handleFetchDrafts();
        // setDraftData([
        //     {
        //         id: 4,
        //         title: "z",
        //         topic: "",
        //         image: "",
        //         content:
        //             "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
        //         author: "blah",
        //         date: "23rd July, 2023, 12:30 pm",
        //     },
        //     {
        //         id: 5,
        //         title: "z",
        //         topic: "",
        //         image: "",
        //         content: "This is the content",
        //         author: "blah",
        //         date: "25th July, 2023, 12:30 pm",
        //     },
        //     {
        //         id: 6,
        //         title: "z",
        //         topic: "",
        //         image: "",
        //         content: "This is the content",
        //         author: "blah",
        //         date: "29th July, 2023, 12:30 pm",
        //     },
        //     {
        //         id: 5,
        //         title: "z",
        //         topic: "",
        //         image: "",
        //         content: "This is the content",
        //         author: "blah",
        //         date: "25th July, 2023, 12:30 pm",
        //     },
        //     {
        //         id: 6,
        //         title: "z",
        //         topic: "",
        //         image: "",
        //         content: "This is the content",
        //         author: "blah",
        //         date: "29th July, 2023, 12:30 pm",
        //     },
        // ]);
    }, [user]);

    return (
        <>
            <p className="font-semibold text-xl text-center mt-8 mb-4">
                Saved As Drafts
            </p>
            <div className="flex flex-wrap gap-8 w-[90%] sm:w-[80%] md:w-[70%] mx-auto justify-center">
                {draftData.map((draft) => {
                    return (
                        <div
                            key={draft.key}
                            className="cursor-pointer shadow-xl p-4 rounded-lg hover:bg-slate-100"
                            onClick={() => navigate(`/edit-draft/${draft.id}`)}
                        >
                            <div className="h-[200px] w-[150px] overflow-hidden">
                                <strong>{draft.title}</strong>
                                <div>{draft?.description}</div>
                            </div>
                            <div className="text-sm font-light border-t-2 text-center py-1">
                                {new Date(draft?.updated_at).toLocaleString()}
                            </div>
                        </div>
                    );
                })}
                {draftData.length === 0 ? (
                    <p className="text-xl font-semibold text-center m-4">
                        No Drafts Available
                    </p>
                ) : null}
            </div>
        </>
    );
};

export default Drafts;
