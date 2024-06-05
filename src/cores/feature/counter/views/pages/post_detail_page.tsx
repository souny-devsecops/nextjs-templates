"use client"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Undo2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { PostDetailSkeleton } from '../component/loading/post_skeleton'
import { useAppDispatch } from '@/lib/store'
import { useSelector } from 'react-redux'
import { counterSelector } from '../../controller/counter_controller'
import { fetchPost } from '../../controller/counter_thunk'

export default function PostDetail({ id }: { id: string }) {
    const dispatch = useAppDispatch();
    const counterReducer = useSelector(counterSelector);

    useEffect(() => {
        dispatch(fetchPost(id))
    }, [dispatch]);
    const router = useRouter()
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {counterReducer.LoadingPostInfo ? <PostDetailSkeleton /> :
                <div className='bg-slate-50 p-4 rounded-lg w-1/2 flex flex-col items-center justify-center'>
                    <Avatar className='bg-primary'>
                        <AvatarFallback className='bg-primary text-white font-bold text-lg'>{counterReducer.Post?.id}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-none font-semibold leading-none tracking-tight text-2xl p-2 text-center'>
                        {counterReducer.Post?.title}
                    </div>
                    <div className='text-sm text-muted-foreground text-center py-3'>
                        {counterReducer.Post?.body}
                    </div>
                    <Button onClick={() => {
                        router.back()
                    }}>
                        <Undo2 /> <span className='pl-2'>Back</span>
                    </Button>
                </div>}

        </div>
    )
}
