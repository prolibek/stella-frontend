import axios from "axios";
import { store } from "../store";

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

export default $api;