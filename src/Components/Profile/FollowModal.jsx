import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";

const FollowModal = ({
    modalVis,
    setModalVis,
    following,
    followed_by,
}) => {
    const { user } = useAuth();
    const { setLoading, setShowMessage } = useLoading();
    const navigate = useNavigate();
    const [idsDetails, setIdsDetails] = useState([]);

    useEffect(() => {
        if (modalVis === "Following") {
            // fetch the data using the followed_user_ids and username
            // setProfiles(followed_user_ids); // in case of fetching any user related data
            setIdsDetails(following)
        } else if (modalVis === "Followed") {
            // fetch the data using the followed_by_user_ids and username
            // setProfiles(followed_by_user_ids); // in case of fetching any user related data
            setIdsDetails(followed_by)
        }
    }, []);

    const setProfiles = async (userIds) => {
        setLoading(true);
        const res = await useAxios({
            url: "/profiles",
            method: "POST",
            body: JSON.stringify({ ids: userIds }),
        });
        setLoading(false);
        if (res?.status) {
            setIdsDetails(res?.data?.profiles);
        } else {
            setModalVis(false);
            setShowMessage({
                status: "error",
                message: res?.message + "-" + res?.response?.statusText,
            });
        }
    };

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
                        key={detail.id}
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
