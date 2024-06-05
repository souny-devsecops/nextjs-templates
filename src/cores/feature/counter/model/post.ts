export interface PostModel {
    userId: number
    id: number
    title: string
    body: string
}




export interface PostPayload {
    id?: number
    title: string
    body: string
    userId: number | null
}
