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
