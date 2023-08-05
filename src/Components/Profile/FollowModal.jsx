import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useAxios } from "../../useAxios";

const FollowModal = ({
    modalVis,
    setModalVis,
    name,
    username,
    followed_user_ids = null,
    followed_by_user_ids = null,
}) => {
    const navigate = useNavigate();
    const [idsDetails, setIdsDetails] = useState([]);
    useEffect(() => {
        if (modalVis === "Following") {
            // fetch the data using the followed_user_ids and username
            setIdsDetails([
                { id: 1, name: "John Doe" },
                { id: 2, name: "Test 1" },
                { id: 3, name: "Test 2" },
            ]);
        } else if (modalVis === "Followed") {
            // fetch the data using the followed_by_user_ids and username

            setIdsDetails([
                { id: 2, name: "Test 1" },
                { id: 3, name: "Test 2" },
                { id: 4, name: "Test 3" },
            ]);
        }
    }, []);
    return (
        <dialog open={!!modalVis}>
            <div className="self-center">
                <button type="button" onClick={(e) => setModalVis(null)}>
                    ╳
                </button>
            </div>
            {idsDetails.map((detail) => {
                return (
                    <p
                        className="p-2 hover:bg-slate-200 cursor-pointer"
                        onClick={() => {
                            navigate(`/profile/${detail.id}`);
                            setModalVis(null);
                        }}
                    >
                        {detail.name}
                    </p>
                );
            })}
        </dialog>
    );
};

export default FollowModal;
