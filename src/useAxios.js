// useAxios hook

import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3000";

const useAxios = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        async function fetchData() {
            await axios[method](url, JSON.parse(headers), JSON.parse(body))
                .then((res) => {
                    setResponse(res.data);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setloading(false);
                });
        }
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [method, url, body, headers]);

    return { response, error, loading };
};

export default useAxios;
