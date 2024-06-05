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
import { CirclePlus } from "lucide-react"
import { FormEvent, useState } from "react"
import { createPost } from "../../controller/counter_thunk"
import { PostPayload } from "../../model/post"
import { toast } from "sonner"
import LoaderComponent from "@/components/loader"
import { cn } from "@/lib/utils"


export function DialogCreatePost() {
    const dispatch = useAppDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        setIsLoading(true)
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const payload: PostPayload = {
            title: formData.get("title") as string,
            body: formData.get("body") as string,
            userId: 1
        }
        await dispatch(createPost(payload)).unwrap()
        setIsDialogOpen(false);
        setIsLoading(false)
    }
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button className=''>
                    <CirclePlus /><span className='ml-2'>Create New Post</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Creating a post</DialogTitle>
                    <DialogDescription>
                        Make new to your post here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="flex flex-col py-4 space-y-5">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name" className="text-left">
                            Title
                        </Label>
                        <Input name="title" className="col-span-3" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="username" className="text-left">
                            Body
                        </Label>
                        <Input name="body" className="col-span-3" />
                    </div>

                    <DialogFooter className="items-end">
                        <Button type="submit" disabled={isLoading} className={cn("w-full", isLoading ? "bg-primary shadow-none" : "")}> <div className={cn(!isLoading ? "hidden" : "")}><LoaderComponent /></div> <span className={"pl-3"}>Save your post</span></Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
