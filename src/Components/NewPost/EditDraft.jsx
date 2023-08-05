import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import EditPost from "./EditPost";

const EditDraft = () => {
    const [searchParams] = useSearchParams();
    const [postId, setPostId] = useState(searchParams.get("id") || "");
    const [previousVersVis, setPreviousVersVis] = useState(false);
    const [prevVerList, setPrevVerList] = useState([]);

    const handlePreviousVer = () => {
        // fetch the data and save it in previousVersion data state
        setPrevVerList([
            { id: 1, date: "28th July, 12:30pm" },
            { id: 2, date: "27th July, 10:30am" },
            { id: 1, date: "28th July, 12:30pm" },
            { id: 2, date: "27th July, 10:30am" },
        ]);
        setPreviousVersVis(true);
    };

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                <div className="flex justify-between w-full">
                    <button
                        type="button"
                        className="button"
                        onClick={handleSaveAsDraft}
                    >
                        Save as Draft
                    </button>
                    <button
                        type="button"
                        className="border-none underline font-light"
                        onClick={handlePreviousVer}
                    >
                        Previous Versions
                    </button>
                </div>
                <EditPost />
                <dialog
                    open={previousVersVis ? "open" : false}
                    className={`${previousVersVis ? "flex" : ""}`}
                >
                    <button
                        type="button"
                        className="self-center"
                        onClick={() => setPreviousVersVis(false)}
                    >
                        ╳
                    </button>
                    {prevVerList.map((prevVers) => {
                        return (
                            <Link
                                to={`/edit-post?id=${prevVers.id}?type=draft`}
                                onClick={() => {
                                    setPostId(prevVers.id);
                                    setPreviousVersVis(false);
                                }}
                            >
                                <p className="p-1 border-b-2 border-slate-200 hover:bg-slate-100">
                                    Saved on {prevVers.date}
                                </p>
                            </Link>
                        );
                    })}
                </dialog>
            </div>
        </>
    );
};

export default EditDraft;
