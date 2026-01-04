import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

const api = axios.create({
    baseURL: SPOTIFY_BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
});

api.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    } else {
        delete request.headers.Authorization;
    }

    return request;
})

export default api;