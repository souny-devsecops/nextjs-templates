import { PostModel } from "../model/post"

type StateProp = {
    Counter: number,
    Posts: PostModel[],
    LoadingPost: boolean
    LoadingPostInfo: boolean
    Post: PostModel | null,
    IsShowDeleteAlert: boolean
}

export const initialValue: StateProp = {
    LoadingPost: false,
    Posts: [],
    Counter: 0,
    LoadingPostInfo: false,
    Post: null,
    IsShowDeleteAlert: false
}