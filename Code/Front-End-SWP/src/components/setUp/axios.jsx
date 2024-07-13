import axios from "axios";

const BASE_URL = "https://localhost:7155/";

const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response.data.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

export const customAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
});

customAxios.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && userInfo.accessToken) {
            config.headers["Authorization"] = `Bearer ${userInfo.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

customAxios.interceptors.response.use(
    function (response) {
        // console.log('Full response:', response);  
        return response.data;  
    },
    function (error) {
        return Promise.reject(error);
    },
);

export default instance;
