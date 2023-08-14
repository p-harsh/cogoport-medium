import React from "react";
import { useNavigate } from "react-router-dom";

const ListTab = (list) => {
    const navigate = useNavigate();
    const { title, id, user_id, created_at, updated_at } = list;
    const handleListClick = () => {
        if (id == -1) {
            // go to watch later
        } else {
            let link = encodeURI(`/list/${id}`);
            navigate(link);
        }
    };
    return (
        <>
            <p
                onClick={handleListClick}
                className="hover:bg-slate-50 cursor-pointer px-4 py-2 my-2 border-b-2 border-slate-100"
            >
                {title}
            </p>
        </>
    );
};

export default ListTab;
