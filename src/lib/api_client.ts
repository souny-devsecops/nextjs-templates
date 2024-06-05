import AppApiPath from "@/cores/constants/api_path";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { cookies } from "next/headers";


axios.defaults.headers.common.Accept = "application/json";
axios.defaults.timeout = 12000;

const axiosInstance = axios.create({
    baseURL: AppApiPath.baseUrl,
    responseType: "json",
});


const getHttpHeaders = (isAuthenticated: boolean): AxiosRequestConfig => {
    const token: any = cookies().get('token')
    if (isAuthenticated) {
        return {
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
        };
    }
    return {};
};


const get = (path: string, isAuthenticated = true): Promise<AxiosResponse> =>
    axiosInstance.get(path, getHttpHeaders(isAuthenticated));
const del = (path: string, isAuthenticated = true): Promise<AxiosResponse> =>
    axiosInstance.delete(path, getHttpHeaders(isAuthenticated));
const post = (path: string, data: any, isAuthenticated = true): Promise<AxiosResponse> =>
    axiosInstance.post(path, data, getHttpHeaders(isAuthenticated));
const put = (path: string, data: any, isAuthenticated = true): Promise<AxiosResponse> =>
    axiosInstance.put(path, data, getHttpHeaders(isAuthenticated));
const patch = (path: string, data: any, isAuthenticated = true): Promise<AxiosResponse> =>
    axiosInstance.put(path, data, getHttpHeaders(isAuthenticated));
const ApiClinet = {
    get,
    del,
    post,
    put,
    patch,
}
export default ApiClinet;