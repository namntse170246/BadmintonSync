import axios from "axios";

const BASE_URL = "http://meokool-001-site1.ltempurl.com/";

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
    headers: { "Content-Type": "application/json" },
});
customAxios.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // console.log(userInfo);
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
        return response.data.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default instance;
