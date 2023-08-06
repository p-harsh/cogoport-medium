import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAxios } from "../../useAxios";
import EditPost from "./Edit";

const EditDraft = () => {
    const { id } = useParams();
    const data = {
        id: 5,
        title: "This is the new post with a image attached and topic as well",
        created_at: "2023-08-06T12:32:32.749Z",
        updated_at: "2023-08-06T12:32:32.881Z",
        image_url:
            "http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--b605b49464c62eb0e6d89388e503b3364fe140dd/anxiety_vs_reaction.png",
        topic: "Food",
        description:
            "ost with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
        body: "This is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as wellThis is the new post with a image attached and topic as well",
        comment: ["hello"],
        commenters: ["hello"],
        likes: ["hello"],
        user_id: 1,
        views: null,
    };
    useEffect(() => {
        // fetch on the basis of id of post and send to EditPost
    });

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                <EditPost {...data} />
            </div>
        </>
    );
};

export default EditDraft;
