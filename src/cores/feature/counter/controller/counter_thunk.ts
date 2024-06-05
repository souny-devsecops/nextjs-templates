import { createAsyncThunk } from "@reduxjs/toolkit";
import { CreatePost, DeletePost, FetchPost, FetchPosts, UpdatePost } from "../service/counter_service";
import { PostPayload } from "../model/post";


export const fetchPosts = createAsyncThunk("counter/fetchPosts", async () => await FetchPosts());
export const fetchPost = createAsyncThunk("counter/fetchPost", async (payload: string) => await FetchPost(payload));
export const createPost = createAsyncThunk("counter/createPost", async (payload: PostPayload) => await CreatePost(payload));
export const deletePost = createAsyncThunk("counter/deletePost", async (payload: string) => await DeletePost(payload));
export const updatePost = createAsyncThunk("counter/updatePost", async (payload: PostPayload) => await UpdatePost(payload));