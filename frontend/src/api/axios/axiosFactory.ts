import axios from "axios";

export function createAPI(path: string) {
    const API = axios.create({
        baseURL: `${import.meta.env.VITE_API_BASE_URL}/${path}`,
        headers: {
            "Content-Type": "application/json",
        },
    });

    API.interceptors.request.use((config) => {
        const token =
            localStorage.getItem("accessToken");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    });

    API.interceptors.response.use(
        (response) => response,

        (error) => {
            if (
                error.response?.status === 401
            ) {
                localStorage.removeItem(
                    "accessToken"
                );

                window.location.href =
                    "/login";
            }

            return Promise.reject(error);
        }
    );

    return API;
}