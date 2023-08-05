import jwt from "jwt-decode";
export const checkAuth = () => {
    let res =
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user"))?.id &&
        localStorage.getItem("jwtToken");
    if (res) {
        let token = jwt(JSON.parse(localStorage.getItem("jwtToken")));
        res = res && token.id === JSON.parse(localStorage.getItem("user"))?.id
    }
    return res;
};

export const getUserId = () => {
    if(checkAuth()){
        return jwt(JSON.parse(localStorage.getItem("jwtToken"))).id;
    }
}