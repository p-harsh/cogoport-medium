// useAxios hook
import axios from "axios";
import jwt from "jwt-decode";
axios.defaults.baseURL = "http://localhost:3000";

export const useAxios = async ({
    url,
    method = "GET",
    body = null,
    headers = JSON.stringify({
        "Access-Control-Allow-Origin": "*",
        token: JSON.parse(localStorage.getItem("jwtToken")),
    }),
}) => {
    return axios({
        url,
        method,
        headers: JSON.parse(headers),
        data: JSON.parse(body),
    })
        .then((res) => {
            if (res?.headers["token"]) {
                const token = res.headers.token;
                const user = jwt(token); // decode your token here
                localStorage.setItem("jwtToken", JSON.stringify(token));
                localStorage.setItem("user", JSON.stringify(user));
            }
            console.log(res);
            return res;
        })
        .catch((err) => {
            return err;
        });
};
