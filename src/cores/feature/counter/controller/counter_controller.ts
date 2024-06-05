"use client"

import { RootState } from "@/lib/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostModel } from "../model/post";
import { initialValue } from "./counter_state";
import { toast } from "sonner";




const counterController = createSlice({
    name: "counterController",
    initialState: initialValue,
    reducers: {
        incremented: state => {
            state.Counter += 1
        },
        decremented: state => {
            state.Counter -= 1
        },
        setCounter: (state, action: PayloadAction<number>) => {
            state.Counter = action.payload
        },
        openDialogDelete: (state, action: PayloadAction<boolean>) => {
            state.IsShowDeleteAlert = action.payload
        },
    },
    extraReducers: (builder) => {

        builder
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state, action) => {
                    if (action.type.includes("fetchPosts")) {
                        state.LoadingPost = true;
                    } else if (action.type.includes("fetchPost")) {
                        state.LoadingPostInfo = true;
                    }
                },
            ).addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action: PayloadAction<PostModel[] | PostModel | number>) => {
                    if (action.type.includes("fetchPosts")) {
                        state.Posts = action.payload as PostModel[];
                        state.LoadingPost = false;
                    } else if (action.type.includes("fetchPost")) {
                        state.Post = action.payload as PostModel;
                        state.LoadingPostInfo = false;
                    } else if (action.type.includes("createPost")) {
                        var data: PostModel = action.payload as PostModel
                        if (data) {
                            state.Posts.unshift(data)
                            toast.success("Post has been created 🚀", {
                                description: `${data.body}`,
                            })
                        } else {
                            toast.error("Uh oh! Something went wrong.", {
                                description: `There was a problem with your request.`,
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    } else if (action.type.includes("deletePost")) {
                        var deleteResult: number = action.payload as number
                        if (deleteResult > 0) {
                            state.Posts = state.Posts?.filter(bucket => bucket.id !== deleteResult)!;
                            toast.success("Post has been deleted 🚀", {
                            })
                        } else {
                            toast.error("Uh oh! Something went wrong.", {
                                description: `There was a problem with your request.`,
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    } else if (action.type.includes("updatePost")) {
                        const updatedPost: PostModel = action.payload as PostModel;
                        if (updatedPost) {
                            console.log(updatedPost);

                            // Find the index of the post to update
                            const postIndex = state.Posts.findIndex(post => post.id === updatedPost.id);
                            if (postIndex !== -1) {
                                // Update the post in the state
                                state.Posts[postIndex] = updatedPost;
                            }
                            toast.success("Post has been updated 🚀", {
                                description: `${updatedPost.title}`,

                            });
                        } else {
                            toast.error("Uh oh! Something went wrong.", {
                                description: `There was a problem with your request.`,
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo"),
                                },
                            })
                        }
                    }
                },
            );
    }
})

export const counterSelector = (state: RootState) => state.counterReducer;
export const { incremented, decremented, setCounter, openDialogDelete } = counterController.actions
export default counterController.reducer;