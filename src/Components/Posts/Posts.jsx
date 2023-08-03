import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PostTab from "./PostTab";

const initialFilters = {
    author: "",
    date: "",
    likes: "",
    comments: "",
};
const initialSearch = {
    author: "",
    post: "",
    topic: "None",
};
const Posts = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filterAuthor = searchParams.get("f-author") || "";
    const filterDate = searchParams.get("f-date") || "";
    const filterLikes = searchParams.get("f-likes") || "";
    const filterComments = searchParams.get("f-comments") || "";
    const searchAuthor = searchParams.get("s-author") || "";
    const searchPost = searchParams.get("s-post") || "";
    const searchTopic = searchParams.get("s-topic") || "None";

    const [posts, setPosts] = useState([]);
    // to store filter data
    const [filters, setFilters] = useState(initialFilters);
    // to store search data
    const [searches, setSearches] = useState(initialSearch);

    useEffect(() => {
        setFilters({
            author: filterAuthor,
            date: filterDate,
            likes: filterLikes,
            comments: filterComments,
        });
        setSearches({
            author: searchAuthor,
            post: searchPost,
            topic: searchTopic,
        });

        // fetch the data using all the parameters and update posts state
        // delete post, search post, author, etc.
        setPosts([
            {
                id: 1,
                title: "z",
                topic: [],
                image: "",
                content:
                    "This is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the contentThis is the content",
                date: "17th July, 2023",
                author: "blah",
            },
            {
                id: 2,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "29th July, 2023",
                author: "blah",
            },
            {
                id: 3,
                title: "z",
                topic: [],
                image: "",
                content: "This is the content",
                date: "31st July, 2023",
                author: "blah",
            },
        ]);
    }, []);

    const handleFiltersChange = (e, type) => {
        let tmpFilters = { ...filters };
        setFilters(() => {
            tmpFilters[type] = e.target.value;
            return tmpFilters;
        });
    };

    const handleSearchesChange = (e, type) => {
        let tmpSearches = { ...searches };
        setSearches(() => {
            tmpSearches[type] = e.target.value;
            return tmpSearches;
        });
    };

    const handleFilterSubmit = () => {
        if (
            filters["author"] ||
            filters["likes"] ||
            filters["comments"] ||
            filters["date"]
        ) {
            let link = encodeURI(
                `/posts?f-author=${filters["author"]}&f-date=${filters["date"]}&f-likes=${filters["likes"]}&f-comments=${filters["comments"]}&s-author=${searches["author"]}&s-post${searches["post"]}&s-topic=${searches["topic"]}`
            );
            navigate(link);
        }
    };

    const handleSearchSubmit = () => {
        if (searches["author"] || searches["post"] || searches["topic"]) {
            let link = encodeURI(
                `/posts?f-author=${filters["author"]}&f-date=${filters["date"]}&f-likes=${filters["likes"]}&f-comments=${filters["comments"]}&s-author=${searches["author"]}&s-post${searches["post"]}&s-topic=${searches["topic"]}`
            );
            navigate(link);
        }
    };

    return (
        <>
            <div className="flex flex-col">
                <div className="filter flex flex-row justify-center">
                    <input
                        className="border-2 mx-1 px-2"
                        onChange={(e) => handleFiltersChange(e, "author")}
                        value={filters["author"]}
                        placeholder="Author"
                        type="text"
                        name="filter-author"
                        id="filter-author"
                    />
                    <input
                        className="border-2 mx-1 px-2"
                        onChange={(e) => handleFiltersChange(e, "date")}
                        value={filters["date"]}
                        placeholder="Date"
                        type="date"
                        name="filter-date"
                        id="filter-date"
                    />
                    <input
                        className="border-2 mx-1 px-2"
                        onChange={(e) => handleFiltersChange(e, "likes")}
                        value={filters["likes"]}
                        placeholder="Likes"
                        type="number"
                        name="filter-likes"
                        id="filter-likes"
                    />
                    <input
                        className="border-2 mx-1 px-2"
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

                <div className='m-4'>
                    {posts.map((post) => (
                        <PostTab {...post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Posts;
