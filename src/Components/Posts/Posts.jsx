import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PostTab from "./PostTab";

const initialFilters = {
    author: "",
    startDate: "",
    endDate: "",
    likes: "",
    comments: "",
};
const Posts = ({ renderFilter = true, selectedOption = null }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const filterAuthor = searchParams.get("f-author") || "";
    const filterStartDate = searchParams.get("f-startDate") || "";
    const filterEndDate = searchParams.get("f-startEnd") || "";
    const filterLikes = searchParams.get("f-likes") || "";
    const filterComments = searchParams.get("f-comments") || "";
    const searchAuthor = searchParams.get("s-author") || "";
    const searchPost = searchParams.get("s-post") || "";
    const searchTopic = searchParams.get("s-topic") || "None";
    const tag = searchParams.get("tag") || "";

    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    // to store filter data
    const [filters, setFilters] = useState(initialFilters);
    // to store search data

    const fetchTopicPosts = useCallback(async () => {
        setLoading(true);
        let link = "";
        const res = await useAxios({ url: link, method: "GET" });
        setLoading(false);
        if (res?.status) {
            let data = res.data;
            setPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    }, [tag]);

    useEffect(() => {
        console.log("RENDERS");
        if (!!tag) {
            // fetch based on tags only
            // fetchTopicPosts()
            return;
        }
        setFilters({
            author: filterAuthor,
            startDate: filterStartDate,
            endDate: filterEndDate,
            likes: filterLikes,
            comments: filterComments,
        });

        // fetch the data using all the parameters and update posts state
        // delete post, search post, author, etc.
        setPosts([
            {
                id: "1",
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
                authorId: "1",
            },
            {
                id: "2",
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
                authorId: "2",
            },
            {
                id: "3",
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "31st July, 2023",
                author: "blah",
                authorId: "3",
            },
        ]);
    }, [query, selectedOption]);

    const handleFiltersChange = (e, type) => {
        let tmpFilters = { ...filters };
        setFilters(() => {
            tmpFilters[type] = e.target.value;
            return tmpFilters;
        });
    };

    const handleFilterSubmit = () => {
        if (
            filters["author"] ||
            filters["likes"] ||
            filters["comments"] ||
            filters["startDate"] ||
            filters["endDate"]
        ) {
            let link = encodeURI(
                `${pathname}?f-author=${filters["author"]}&f-startDate=${filters["startDate"]}&f-endDate=${filters["endDate"]}&f-likes=${filters["likes"]}&f-comments=${filters["comments"]}`
            );
            setQuery(link);
            navigate(link);
        }
    };

    return (
        <>
            <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-4">
                {renderFilter && !tag ? (
                    <div className="filter flex flex-row justify-start sm:justify-center flex-wrap">
                        <input
                            className="border-2 mx-1 px-2 my-1"
                            onChange={(e) => handleFiltersChange(e, "author")}
                            value={filters["author"]}
                            placeholder="Author"
                            type="text"
                            name="filter-author"
                            id="filter-author"
                        />
                        <input
                            className="border-2 mx-1 px-2 my-1"
                            onChange={(e) =>
                                handleFiltersChange(e, "startDate")
                            }
                            value={filters["startDate"]}
                            placeholder="Start Date"
                            type="date"
                            name="filter-startDate"
                            id="filter-startDate"
                        />
                        <input
                            className="border-2 mx-1 px-2 my-1"
                            onChange={(e) => handleFiltersChange(e, "endDate")}
                            value={filters["endDate"]}
                            placeholder="End Date"
                            type="date"
                            name="filter-endDate"
                            id="filter-endDate"
                        />
                        <input
                            className="border-2 mx-1 px-2 my-1"
                            onChange={(e) => handleFiltersChange(e, "likes")}
                            value={filters["likes"]}
                            placeholder="Likes"
                            type="number"
                            name="filter-likes"
                            id="filter-likes"
                        />
                        <input
                            className="border-2 mx-1 px-2 my-1"
                            onChange={(e) => handleFiltersChange(e, "comments")}
                            value={filters["comments"]}
                            placeholder="Comments"
                            type="number"
                            name="filter-comments"
                            id="filter-comments"
                        />
                        <button type="button" onClick={handleFilterSubmit}>
                            Filter
                        </button>
                    </div>
                ) : null}

                <div className="m-4">
                    {posts.map((post) => (
                        <PostTab {...post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Posts;
