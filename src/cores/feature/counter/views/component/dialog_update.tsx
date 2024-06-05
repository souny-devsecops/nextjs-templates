import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch } from "@/lib/store"
import { CirclePlus, Pencil } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { createPost, updatePost } from "../../controller/counter_thunk"
import { PostModel, PostPayload } from "../../model/post"
import { toast } from "sonner"
import LoaderComponent from "@/components/loader"
import { cn } from "@/lib/utils"

interface DialogUpdatePostProps {
    post: PostModel;
    closeDropdown: () => void;
}

export function DialogUpdatePost({ post, closeDropdown }: DialogUpdatePostProps) {
    const dispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault()
        const payload: PostPayload = {
            id: post.id,
            title: title,
            body: body,
            userId: post.userId
        }
        await dispatch(updatePost(payload)).unwrap()
        setIsDialogOpen(false);
        setIsLoading(false)
        closeDropdown()
    }

    useEffect(() => {
        if (isDialogOpen) {
            setTitle(post.title);
            setBody(post.body);
        }
    }, [isDialogOpen, post.title, post.body]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open) }}>
            <DialogTrigger asChild>
                <Button className="w-full items-start flex flex-row justify-between" variant="ghost">Update <Pencil className='w-4 text-primary' /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Your post</DialogTitle>
                    <DialogDescription>
                        Make new to your post here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex flex-col py-4 space-y-5">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input name="title" className="col-span-3" value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" className="text-left">
                            Body
                        </Label>
                        <Input name="body" className="col-span-3" value={body}
                            onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <DialogFooter className="items-end">
                        <Button type="submit" disabled={isLoading} className={cn("w-full", isLoading ? "bg-primary shadow-none" : "")}> <div className={cn(!isLoading ? "hidden" : "")}><LoaderComponent /></div> <span className={"pl-3"}>Save</span></Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
