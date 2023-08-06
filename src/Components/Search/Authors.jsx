import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authors = ({ author }) => {
    const navigate = useNavigate();
    const [authorList, setAuthorList] = useState([]);
    useEffect(() => {
        // fetch the details from search author
        setAuthorList([
            {
                id: 1,
                name: "Harsh 1",
                email: "johndoe1@gmail.com",
                followed_user_ids: 2,
                followed_by_user_ids: 4,
            },
            {
                id: 2,
                name: "Harsh 2",
                email: "johndoe2@gmail.com",
                followed_user_ids: 4,
                followed_by_user_ids: 2,
            },
            {
                id: 3,
                name: "Harsh 3",
                email: "johndoe3@gmail.com",
                followed_user_ids: 5,
                followed_by_user_ids: 1,
            },
            {
                id: 4,
                name: "Harsh 4",
                email: "johndoe4@gmail.com",
                followed_user_ids: 1,
                followed_by_user_ids: 5,
            },
        ]);
    }, []);
    return (
        <div>
            {authorList.map((item) => {
                return (
                    <div
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
                                <strong>{item.followed_by_user_ids}</strong>
                            </p>
                            <p className="font-light flex items-center gap-2">
                                Following{" "}
                                <strong>{item.followed_user_ids}</strong>
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Authors;
