import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EditPost from "./Edit";
import { useAxios } from "../../useAxios";

const EditDraft = () => {
    const {id} = useParams();

    useEffect(() => {
        // fetch on the basis of id of post and send to EditPost
    })

    return (
        <>
            <div className="flex flex-col items-start my-8 w-[90%] md:w-[80%] mx-auto">
                <EditPost
                    title={"Maybe you don’t know CSS Selector Precedence!"}
                    content={
                        "Have you ever thought about why some CSS properties are not getting applied, although you’re doing everything correctly? Well, that may be due to CSS Selector Precedence. The CSS selector precedence hierarchy can be summarized as follows, from highest to lowest: Inline Styles:"
                    }
                    type="draft"
                />
            </div>
        </>
    );
};

export default EditDraft;
