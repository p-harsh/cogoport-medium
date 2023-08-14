// useAxios hook
import axios from "axios";
import { BASE_URL } from "./APIConfig/endpoint";
axios.defaults.baseURL = BASE_URL;

export const useAxios = async ({
    url,
    method = "GET",
    body = null,
    headers = "{}",
}) => {
    let data = { res: null, error: null };
    await axios({
        url,
        method,
        headers: JSON.parse(headers),
        data: JSON.parse(body),
        withCredentials: true,
    })
        .then((response) => {
            console.log(response);
            response = response.data;
            data.res = response;
            // return res;
        })
        .catch((err) => {
            data.error = err;
        });
    console.log(data);
    return data;
};
