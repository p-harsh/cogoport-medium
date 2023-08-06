export const FavoriteIcon = ({ fill, classname }) => (
    <svg
        fill={fill}
        className={classname}
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
    >
        <path d="m480-121-41-37q-106-97-175-167.5t-110-126Q113-507 96.5-552T80-643q0-90 60.5-150.5T290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.5T880-643q0 46-16.5 91T806-451.5q-41 55.5-110 126T521-158l-41 37Z" />
    </svg>
);
export const MS_IN_DAY = 86400000;

export const postsReadDbInit = () => {
    let postsReadList = JSON.parse(localStorage.getItem("postsRead"));
    if (!postsReadList) {
        postsReadList = Array(10).fill({
            timestamp: new Date().getTime() - MS_IN_DAY,
        });
        localStorage.setItem("postsRead", JSON.stringify(postsReadList));
    }
    if (!localStorage.getItem("plan")) {
        localStorage.setItem("plan", "free");
    }
    return postsReadList;
};

export const isUserPlanAllowed = (postsReadList) => {
    let isAllowed = true;
    if (
        !localStorage.getItem("plan") ||
        (localStorage.getItem("plan") && localStorage.getItem("plan") == "free")
    ) {
        if (new Date().getTime() - postsReadList[0].timestamp < MS_IN_DAY) {
            // show pricing modal to pay
            isAllowed = false;
        }
    } else if (localStorage.getItem("plan") === "30") {
        if (new Date().getTime() - postsReadList[2].timestamp < MS_IN_DAY) {
            // show pricing modal to pay
            isAllowed = false;
        }
    } else if (localStorage.getItem("plan") === "50") {
        if (new Date().getTime() - postsReadList[4].timestamp < MS_IN_DAY) {
            // show pricing modal to pay
            isAllowed = false;
        }
    } else if (localStorage.getItem("plan") === "100") {
        if (new Date().getTime() - postsReadList[9].timestamp < MS_IN_DAY) {
            // show pricing modal to pay
            isAllowed = false;
        }
    }
    return isAllowed;
};

export const updateReadList = (postsReadList) => {
    const list = [...postsReadList];
    list.pop();
    list.unshift({ timestamp: new Date().getTime() });
    localStorage.setItem("postsRead", JSON.stringify(list));
    return list;
};
