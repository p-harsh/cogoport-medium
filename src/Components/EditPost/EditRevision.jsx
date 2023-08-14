import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import Edit from "./Edit";
import { endpoints } from "../../APIConfig/endpoint";

const EditRevision = () => {
    const { postId, id } = useParams();
    const { setLoading, setShowMessage } = useLoading();
    const [revisionData, setRevisionData] = useState({});

    const fetchRevisionPost = async () => {
        setLoading(true);
        let { res, error } = await useAxios({
            url: endpoints.getRevisionDraft,
            method: "POST",
            body: JSON.stringify({ id: postId }),
        });
        setLoading(false);
        if (res) {
            res = res.find(
                (post) => post.id == id && post.article_id == postId
            );
            if (res?.id) setRevisionData(res);
        }

        if (error)
            setShowMessage({
                status: "error",
                message: error?.message,
            });
    };
    useEffect(() => {
        // fetch on the basis of id of post and send to EditPost
        if (id) fetchRevisionPost();
    }, [id, postId]);

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                {revisionData.id ? (
                    <Edit type="draft" revision={true} {...revisionData} />
                ) : null}
            </div>
        </>
    );
};

export default EditRevision;
