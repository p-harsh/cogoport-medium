import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { endpoints } from "../../APIConfig/endpoint";
import { useLoading } from "../../Context/LoadingContext";
import { useAxios } from "../../useAxios";
import { SortOrder } from "../Icons/Icons";
import PostTab from "./PostTab";

const initialFilters = {
    author: "",
    startDate: "",
    endDate: "",
};
const Posts = ({ renderFilter = true, selectedOption = null }) => {
    const { setLoading, setShowMessage } = useLoading();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const [sortOrder, setSortOrder] = useState("Asc");
    let filterAuthor = searchParams.get("f-author") || "";
    let filterStartDate = searchParams.get("f-startDate") || "";
    let filterEndDate = searchParams.get("f-endDate") || "";
    let searchAuthor = searchParams.get("s-author") || "";
    let searchPost = searchParams.get("s-post") || "";
    let tag = searchParams.get("tag") || "";

    const [sortSelect, setSortSelect] = useState("None");

    const [query, setQuery] = useState("");
    const [posts, setPosts] = useState([]);
    // to store filter data
    const [filters, setFilters] = useState(initialFilters);

    const fetchTopicPosts = useCallback(async () => {
        setLoading(true);
        let link = endpoints.getPostsByTopic;
        const { res, error } = await useAxios({
            url: link,
            method: "POST",
            body: JSON.stringify({ topic: tag }),
        });
        setLoading(false);
        if (res) {
            setPosts(res);
        }
        if (error) {
            setShowMessage({ status: "error", message: error?.message });
        }
    }, [tag]);

    const fetchAllPosts = async () => {
        setLoading(true);
        let link = endpoints.getAllPosts;
        const { res, error } = await useAxios({ url: link, method: "GET" });
        setLoading(false);
        if (res) {
            setPosts(res);
        }
        if (error) {
            setShowMessage({ status: "error", message: error?.message });
        }
    };

    const fetchAllPostsTitle = async () => {
        setLoading(true);
        let link = endpoints.searchPosts(searchPost);
        const { res, error } = await useAxios({
            url: link,
            method: "GET",
        });
        setLoading(false);
        if (res) {
            setPosts(res);
        }
        if (error) {
            setShowMessage({ status: "error", message: error?.message });
        }
    };

    const removeTime = (d) => {
        let tmp = new Date(new Date(d).setHours(0, 0, 0)).getTime();
        return tmp;
    };

    const fetchPostsByAuthor = async (filterAuthor) => {
        setLoading(true);
        let link = endpoints.searchPosts(filterAuthor);
        const { res, error } = await useAxios({
            url: link,
            method: "GET",
        });
        setLoading(false);
        if (res) {
            return res;
        }
        if (error) {
            setShowMessage({ status: "error", message: error?.messages });
        }
    };

    const filterData = async (filterAuthor, filterStartDate, filterEndDate) => {
        let tmpPosts;
        if (filterAuthor) tmpPosts = await fetchPostsByAuthor(filterAuthor);
        else tmpPosts = posts;
        tmpPosts = tmpPosts.filter((post) => {
            let start = filterStartDate,
                end = filterEndDate;
            if (!filterStartDate) {
                // filter start is not provided keep it as min as possible
                start = 0;
            }
            if (!filterEndDate) {
                end = new Date();
                end = end.setDate(end.getDate() + 1); // +1 to set time to EOD of today
            } // as created date will always be less than current time
            console.log(
                removeTime(start),
                removeTime(end),
                new Date(post.published_at).getTime()
            );
            return (
                new Date(post.published_at).getTime() >= removeTime(start) &&
                new Date(post.published_at).getTime() <= removeTime(end)
            );
        });
        console.log(tmpPosts);
        setPosts(tmpPosts);
    };

    useEffect(() => {
        filterAuthor = searchParams.get("f-author") || "";
        filterStartDate = searchParams.get("f-startDate") || "";
        filterEndDate = searchParams.get("f-endDate") || "";
        searchAuthor = searchParams.get("s-author") || "";
        searchPost = searchParams.get("s-post") || "";
        tag = searchParams.get("tag") || "";

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
            return;
        }
        if (filterAuthor || filterStartDate || filterEndDate) {
            filterData(filterAuthor, filterStartDate, filterEndDate);
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
                `${pathname}?f-author=${filters["author"]}&f-startDate=${filters["startDate"]}&f-endDate=${filters["endDate"]}`
            );
            navigate(link);
            setQuery(link);
        }
    };

    const handleSorting = () => {
        let tmpPosts = [...posts];
        if (sortSelect === "None") {
            fetchAllPosts();
        } else if (sortSelect === "Likes") {
            tmpPosts = tmpPosts.sort((a, b) =>
                sortOrder === "Asc"
                    ? a?.post_likes - b?.post_likes
                    : b?.post_likes - a?.post_likes
            );
            setPosts(tmpPosts);
        } else if (sortSelect === "Comments") {
            tmpPosts = tmpPosts.sort((a, b) =>
                sortOrder === "Asc"
                    ? a?.post_comments - b?.post_comments
                    : b?.post_comments - a?.post_comments
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
                            <button
                                className="p-1 mx-1"
                                onClick={() =>
                                    setSortOrder((prev) =>
                                        prev === "Asc" ? "Desc" : "Asc"
                                    )
                                }
                            >
                                <SortOrder
                                    className={`w-[20px] h-[20px] ${
                                        sortOrder === "Asc"
                                            ? "rotate-180"
                                            : "rotate-0"
                                    }`}
                                />
                            </button>
                        </div>
                    </>
                ) : null}
                {posts?.length > 0 ? (
                    <div className="m-4">
                        {posts.map((post) => (
                            <PostTab key={post.id} {...post} />
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
