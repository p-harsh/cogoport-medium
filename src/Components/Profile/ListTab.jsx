import React from "react";
import { useNavigate } from "react-router-dom";

const ListTab = (list) => {
    const navigate = useNavigate()
    const { name, id } = list;
    const handleListClick = () => {
        let link = encodeURI(`/list/${id}`);
        navigate(link);
    }
    return (
        <>
            <p 
            onClick={handleListClick}
            className="hover:bg-slate-50 cursor-pointer px-4 py-2 my-2 border-b-2 border-slate-100">
                {name}
            </p>
        </>
    );
};

export default ListTab;
