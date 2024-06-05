import { Skeleton } from "@/components/ui/skeleton"

export function PostDetailSkeleton() {
    return (
        <div className="bg-slate-50 p-4 rounded-lg w-1/2 flex flex-col items-center justify-center mb-3">
            <div className="flex flex-col w-full space-y-5 p-2 bg-slate-50 m-2 rounded-xl">
                <div className="flex flex-col h-36 items-center space-y-5">
                    <Skeleton className="flex h-12 w-12 rounded-full" />
                    <Skeleton className="flex h-4 w-full" />
                    <Skeleton className="flex h-4 w-1/2" />
                    <Skeleton className="flex h-4 w-20" />
                </div>
            </div>
        </div >

    )
}
