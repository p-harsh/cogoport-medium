export const handleSearchSubmit = (searches, selectedSearch) => {
    if (
        (selectedSearch === "author" && searches["author"]) ||
        (selectedSearch === "post" && searches["post"]) ||
        (selectedSearch === "topic" &&
            searches["topic"] &&
            searches["topic"] !== "None")
    ) {
        let link;
        if (
            selectedSearch === "topic" &&
            searches["topic"] &&
            searches["topic"] !== "None"
        )
            link = encodeURI(`/search?tag=${searches["topic"]}`);
        else
            link = encodeURI(
                `/search?s-${selectedSearch}=${
                    searches[selectedSearch.toLowerCase()]
                }`
            );
        window.location.href = window.location.origin + link;
    }
};