import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../../APIConfig/endpoint";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";

const Authors = ({ author }) => {
    const { setLoading, setShowMessage } = useLoading();
    const navigate = useNavigate();
    const [authorList, setAuthorList] = useState([]);
    const fetchAuthors = async () => {
        setLoading(true);
        const { res, error } = await useAxios({
            url: endpoints.searchProfile(author),
            method: "GET",
        });
        setLoading(false);
        if (res) {
            setAuthorList(res);
        }
        if (error) {
            setShowMessage({
                status: "error",
                message: error?.message,
            });
        }
    };
    useEffect(() => {
        // fetch the details from search author
        fetchAuthors();
    }, []);
    return (
        <div>
            <p className='text-xl font-bold text-center mt-2'>Authors List</p>
            {authorList.map((item) => {
                return (
                    <div
                        key={item.id}
                        className="min-w-[200px] justify-center flex items-center py-3 px-6 shadow-md w-fit rounded-lg mx-auto my-6 hover:bg-slate-100 cursor-pointer"
                        onClick={() => navigate(`/profile/${item.user_id}`)}
                    >
                        <div className="mr-2">
                            <p className="text-xl font-semibold">{item.name}</p>
                            <p className="text-lg font-light">@{item.bio}</p>
                            {/* Bio is taken as username as provided in server */}
                        </div>

                        {/* Show followers and following if provided by the server */}
                        {/* <div className="flex flex-col text-base ml-8">
                            <p className="font-light flex items-center gap-2">
                                Followers{" "}
                                <strong>
                                    {item.followed_by.length || 0}
                                </strong>
                            </p>
                            <p className="font-light flex items-center gap-2">
                                Following{" "}
                                <strong>
                                    {item.followed.length || 0}
                                </strong>
                            </p>
                        </div> */}
                    </div>
                );
            })}
        </div>
    );
};

export default Authors;
