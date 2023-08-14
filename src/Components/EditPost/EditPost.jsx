import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import Edit from "./Edit";
import { endpoints } from "../../APIConfig/endpoint";

const EditPost = () => {
    const { setLoading, setShowMessage } = useLoading();
    const { postId } = useParams();
    const [postData, setPostData] = useState({});

    const fetchPostData = async () => {
        setLoading(true);
        const {res, error} = await useAxios({
            url: endpoints.getPost,
            method: "POST",
            body: JSON.stringify({ id: postId }),
        });
        setLoading(false);
        if (res) {
            setPostData(res);
        } 
        if(error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
    };

    useEffect(() => {
        // for the new post only
        if (postId != -1) {
            // fetch data based on the id and update the content title and src
            fetchPostData();
        }
    }, [postId]);

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                {postId == -1 ? <Edit type="post" {...postData} /> : null}
                {postData && postData.title ? (
                    <Edit type="post" {...postData} />
                ) : null}
            </div>
        </>
    );
};

export default EditPost;
