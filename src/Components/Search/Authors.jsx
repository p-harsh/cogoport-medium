import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";

const Authors = ({ author }) => {
    const { setLoading, setShowMessage } = useLoading();
    const navigate = useNavigate();
    const [authorList, setAuthorList] = useState([]);
    const fetchAuthors = async () => {
        setLoading(true);
        const res = await useAxios({
            url: "/profiles/search",
            method: "POST",
            body: JSON.stringify({ name: author }),
        });
        setLoading(false);
        if (res?.status) {
            setAuthorList(res?.data?.profiles);
        } else {
            setShowMessage({
                status: "error",
                message: "Not able to fetch the details",
            });
        }
    };
    useEffect(() => {
        // fetch the details from search author
        fetchAuthors();
    }, []);
    return (
        <div>
            {authorList.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="flex items-center py-3 px-6 shadow-md w-fit rounded-lg mx-auto my-6 hover:bg-slate-100 cursor-pointer"
                        onClick={() => navigate(`/profile/${item.id}`)}
                    >
                        <div className="mr-2">
                            <p className="text-xl font-semibold">{item.name}</p>
                            <p className="text-lg font-light">{item.email}</p>
                        </div>
                        <div className="flex flex-col text-base ml-8">
                            <p className="font-light flex items-center gap-2">
                                Followers{" "}
                                <strong>{item.followed_by_user_ids.length || 0}</strong>
                            </p>
                            <p className="font-light flex items-center gap-2">
                                Following{" "}
                                <strong>{item.followed_user_ids.length || 0}</strong>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Authors;
