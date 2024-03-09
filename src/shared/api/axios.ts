import axios from "axios";
import { store } from "../store";
import { login } from "@/features/auth/slice";

const API_URL = "http://127.0.0.1:8000/api/v1/";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    const state = store.getState();
    const access_token = state.auth.accessToken;

    if(access_token) 
        config.headers.Authorization = `Bearer ${access_token}`;
    return config;
})

$api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const req = error.config;
        console.log(error.config);
        console.log(error.response);
        if(req._retry === undefined) req._retry = false;
        if(!req._retry && error.response.status === 401 && error.response) {
            req._retry = true;
            try {
                const res = await $api.post("public/users/refresh-token/");
                const response = res.data;
                const access_token = response.access_token;
                localStorage.setItem('access_token', access_token);
                req.headers.Authorization = `Bearer ${access_token}`;
                // here
                store.dispatch(login({
                    accessToken: access_token,
                    user: response.user
                }));
                return $api(req);
            } catch (error) {
                console.log(error);
            }
        }
        return Promise.reject(error);
    }
)

export default $api;