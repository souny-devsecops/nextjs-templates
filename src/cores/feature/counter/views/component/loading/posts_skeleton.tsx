import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
    return (
        <div className="">
            {
                [...Array(8)].map((_, index) => (
                    <div key={index} className="flex flex-col w-full space-y-5 p-2 bg-slate-50 m-2 rounded-xl">
                        <div className="flex flex-row space-x-5 h-20 items-center">
                            <Skeleton className="flex-none h-12 w-12 rounded-full" />
                            <div className="flex flex-col flex-1 space-y-2">
                                <Skeleton className="h-4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}
