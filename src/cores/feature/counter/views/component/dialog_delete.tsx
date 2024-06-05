"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenuItem, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { Trash } from "lucide-react"
import { useSelector } from "react-redux"
import { counterSelector, openDialogDelete } from "../../controller/counter_controller"
import { useAppDispatch } from "@/lib/store"
import { deletePost } from "../../controller/counter_thunk"
import LoaderComponent from "@/components/loader"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function AlertDelete({ id }: { id: string }) {
    const counterReducer = useSelector(counterSelector);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <AlertDialog open={counterReducer.IsShowDeleteAlert} onOpenChange={(open) => { dispatch(openDialogDelete(open)) }}>
            <AlertDialogTrigger asChild>
                <Button className="w-full items-start flex flex-row justify-between" variant="ghost">Delete <Trash className='w-4 text-primary' /></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        post from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button disabled={isLoading} className={cn("w-auto", isLoading ? "bg-primary shadow-none" : "")} onClick={async () => {
                        setIsLoading(true)
                        await dispatch(deletePost(id))
                        dispatch(openDialogDelete(false))
                        setIsLoading(false)
                    }}><div className={cn(!isLoading ? "hidden" : "")}><LoaderComponent /></div><span className={cn(!isLoading ? "" : "pl-2")}>Continue</span></Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
