import axios from "axios";
const envBase = import.meta?.env?.API_DOMAIN;
export const baseAxios = axios.create({
    baseURL: envBase || "http://localhost:8080",
    withCredentials: true,
});
