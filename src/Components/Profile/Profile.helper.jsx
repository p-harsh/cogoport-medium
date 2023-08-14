export const isCurrentUser = (users, userId) => {
    let flag = false;
    users.forEach((user) => {
        if (!flag && user.user_id == userId) {
            flag = true;
        }
    });
    return flag;
};
