import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Edit from "./Edit";

const EditPost = ({ type = "New Post" }) => {
    const { id } = useParams();
    const [postData, setPostData] = useState({});

    useEffect(() => {
        // for the new post only
        if (id !== -1) {
            // fetch data based on the id and  update the content title and src
            setPostData()
        }
    }, [id]);

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                <Edit type="post" title="blah" content="something" />
            </div>
        </>
    );
};

export default EditPost;
