"use server"

import ApiClinet from "@/lib/api_client";
import { PostModel, PostPayload } from "../model/post";
import { AxiosError } from "axios";
export const FetchPosts = async (): Promise<PostModel[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
        const res = await ApiClinet.get('/posts', false);
        const data: PostModel[] = res.data;
        return data
    } catch (error) {
        const err = error as AxiosError;
        const dataError: PostModel[] = err.response?.data as PostModel[];
        return dataError;
    }
}

export const FetchPost = async (id: string): Promise<PostModel> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
        const res = await ApiClinet.get(`/posts/${id}`, false);
        const data: PostModel = res.data;
        return data
    } catch (error) {
        const err = error as AxiosError;
        const dataError: PostModel = err.response?.data as PostModel;
        return dataError;
    }
}
export const CreatePost = async (payload: PostPayload): Promise<PostModel> => {

    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
        const res = await ApiClinet.post(`/posts`, payload, false);
        const data: PostModel = res.data;
        return data
        // throw new Error("Division by Zero!");
    } catch (error) {
        const err = error as AxiosError;
        const dataError: PostModel = err.response?.data as PostModel;
        return dataError;
    }
}

export const DeletePost = async (id: string): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
        const res = await ApiClinet.del(`/posts/${id}`, false);
        const data: PostModel = res.data;
        return Number(id)
    } catch (error) {
        return 0;
    }
}

export const UpdatePost = async (payload: PostPayload): Promise<PostModel> => {
    console.log("payload: " + payload);

    await new Promise((resolve) => setTimeout(resolve, 700));
    try {
        const res = await ApiClinet.put(`/posts/${payload.id}`, payload, false);
        const data: PostModel = res.data;
        return data
    } catch (error) {
        const err = error as AxiosError;
        const dataError: PostModel = err.response?.data as PostModel;
        return dataError;
    }
}