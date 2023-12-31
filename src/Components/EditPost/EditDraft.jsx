import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import Edit from "./Edit";
import { endpoints } from "../../APIConfig/endpoint";

const EditDraft = () => {
    const { id } = useParams();
    const { setLoading, setShowMessage } = useLoading();
    const [draftData, setDraftData] = useState({});

    const fetchDraftPost = async () => {
        setLoading(true);
        const { res, error } = await useAxios({
            url: endpoints.getPost,
            method: "POST",
            body: JSON.stringify({ id: id }),
        });
        setLoading(false);
        if (res) setDraftData(res);

        if (error)
            setShowMessage({
                status: "error",
                message: error?.message,
            });
    };
    useEffect(() => {
        // fetch on the basis of id of post and send to EditPost
        if (id) fetchDraftPost();
    }, [id]);

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                {draftData.id ? <Edit type="draft" {...draftData} /> : null}
            </div>
        </>
    );
};

export default EditDraft;
