import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import PostTab from "./PostTab";

const initialFilters = {
    author: "",
    startDate: "",
    endDate: "",
};
const Posts = ({ renderFilter = true, selectedOption = null }) => {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const filterAuthor = searchParams.get("f-author") || "";
    const filterStartDate = searchParams.get("f-startDate") || "";
    const filterEndDate = searchParams.get("f-startEnd") || "";
    const searchAuthor = searchParams.get("s-author") || "";
    const searchPost = searchParams.get("s-post") || "";
    const tag = searchParams.get("tag") || "";

    const [sortSelect, setSortSelect] = useState("None");

    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    // to store filter data
    const [filters, setFilters] = useState(initialFilters);

    const fetchTopicPosts = useCallback(async () => {
        setLoading(true);
        let link = "/post/search/topic";
        const res = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ topic: tag }),
        });
        setLoading(false);
        if (res?.status) {
            let data = res.data.posts;
            setPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    }, [tag]);

    const fetchAllPosts = async () => {
        setLoading(true);
        let link = "/post/latest";
        const res = await useAxios({ url: link, method: "GET" });
        setLoading(false);
        if (res?.status) {
            let data = res?.data?.posts;
            setPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    };

    const fetchAllPostsTitle = async () => {
        setLoading(true);
        let link = "/post/search/title";
        const res = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ title: searchPost }),
        });
        setLoading(false);
        if (res?.status) {
            let data = res.data.posts;
            setPosts(data);
        } else {
            setShowMessage({ status: "error", message: res?.message });
        }
    };

    useEffect(() => {
        console.log("RENDERS");
        if (
            !filterAuthor &&
            !filterStartDate &&
            !filterEndDate &&
            !searchAuthor &&
            !searchPost &&
            !tag
        ) {
            // fetch all the posts
            fetchAllPosts();
            return;
        }
        if (!!tag) {
            // fetch based on tags only
            fetchTopicPosts();
            return;
        } else if (searchPost) {
            fetchAllPostsTitle();
        }
        if (filterAuthor || filterStartDate || filterEndDate) {
            let tmpPosts = [...posts];
            tmpPosts = tmpPosts.filter((post) => {
                let start = filterStartDate,
                    end = filterEndDate;
                if (!filterStartDate) {
                    start = 0;
                }
                if (!filterEndDate) end = Infinity;
                return (
                    new Date(post.created_at).getTime() >= new Date(start) &&
                    new Date(post.created_at).getTime() <= new Date(start)
                );
            });
            setPosts(tmpPosts);
        }
        setFilters({
            author: filterAuthor,
            startDate: filterStartDate,
            endDate: filterEndDate,
        });

        // fetch the data using all the parameters and update posts state
        // delete post, search post, author, etc.
    }, [query, selectedOption]);

    const handleFiltersChange = (e, type) => {
        let tmpFilters = { ...filters };
        setFilters(() => {
            tmpFilters[type] = e.target.value;
            return tmpFilters;
        });
    };

    const handleFilterSubmit = () => {
        if (filters["author"] || filters["startDate"] || filters["endDate"]) {
            let link = encodeURI(
                `${pathname}?f-author=${filters["author"]}&f-startDate=${filters["startDate"]}&f-endDate=${filters["endDate"]}}`
            );
            setQuery(link);
            navigate(link);
        }
    };

    const handleSorting = () => {
        let tmpPosts = [...posts];
        if (sortSelect === "None") {
            fetchAllPosts();
        } else if (sortSelect === "Likes") {
            tmpPosts = tmpPosts.sort(
                (a, b) => a?.likes.length - b?.likes.length
            );
            setPosts(tmpPosts);
        } else if (sortSelect === "Comments") {
            tmpPosts = tmpPosts.sort(
                (a, b) => a?.commenters.length - b?.commenters.length
            );
            setPosts(tmpPosts);
        }
    };

    return (
        <>
            <div className="flex flex-col w-[90%] sm:w-[80%] md:w-[70%] mx-auto my-4">
                {renderFilter && !tag ? (
                    <>
                        <div className="filter flex flex-row justify-start sm:justify-center flex-wrap">
                            <input
                                className="border-2 mx-1 px-2 my-1"
                                onChange={(e) =>
                                    handleFiltersChange(e, "author")
                                }
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
                                onChange={(e) =>
                                    handleFiltersChange(e, "endDate")
                                }
                                value={filters["endDate"]}
                                placeholder="End Date"
                                type="date"
                                name="filter-endDate"
                                id="filter-endDate"
                            />
                            <button type="button" onClick={handleFilterSubmit}>
                                Filter
                            </button>
                        </div>
                        <div className="my-1 flex flex-row justify-start sm:justify-center flex-wrap">
                            <select
                                className="border-2 mx-2"
                                value={sortSelect}
                                onChange={(e) => setSortSelect(e.target.value)}
                            >
                                <option value="None">None</option>
                                <option value="Likes">Likes</option>
                                <option value="Comments">Comments</option>
                            </select>
                            <button type="button" onClick={handleSorting}>
                                Sort
                            </button>
                        </div>
                    </>
                ) : null}
                {posts?.length > 0 ? (
                    <div className="m-4">
                        {posts.map((post) => (
                            <PostTab {...post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-xl font-semibold text-center m-4">
                        No Posts Found
                    </p>
                )}
            </div>
        </>
    );
};

export default Posts;
