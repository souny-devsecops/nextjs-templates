"use client"
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAppDispatch } from '@/lib/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { counterSelector, decremented, incremented, openDialogDelete, setCounter } from '../controller/counter_controller';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppRouter from '@/cores/constants/routes_path';
import { CirclePlus, EllipsisVertical, Info, Pencil, Trash } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PostSkeleton } from './component/loading/posts_skeleton';
import { fetchPosts } from '../controller/counter_thunk';
import { DialogCreatePost } from './component/dialog_create';
import { AlertDelete } from './component/dialog_delete';
import { DialogUpdatePost } from './component/dialog_update';
export default function IndexCounter() {
    const dispatch = useAppDispatch();
    const counterReducer = useSelector(counterSelector);
    const router = useRouter()
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

    const handleDropdownChange = (postId: number | null) => {
        setOpenDropdownId(postId);
    };
    useEffect(() => {
        // ຖ້າມີຂໍ້ມູນແລ້ວບໍ່ໃຫ້ Fetch Data ອີກ
        if (counterReducer.Posts.length == 0) {
            dispatch(fetchPosts())
        }
    }, [dispatch]);

    return (
        <MaxWidthWrapper className='flex flex-row w-full items-start justify-center h-screen'>
            <div className='flex flex-col items-center flex-none bg-slate-50 p-4 h-screen'>
                <div className='flex flex-none font-semibold leading-none tracking-tight text-2xl mb-8'>
                    Simple State
                </div>

                <div className='p-4 m-3 bg-white shadow-md rounded-full'>
                    <span className='font-bold text-lg'>{counterReducer.Counter}</span>
                </div>
                <div className='flex flex-col'>
                    <Button onClick={() => dispatch(incremented())}>Incremente</Button>
                    <div className='h-2' />
                    <Button onClick={() => dispatch(decremented())}>Decremente</Button>
                    <div className='h-2' />
                    <Button onClick={() => dispatch(setCounter(100))}>Set Counter</Button>
                </div>
            </div>
            <div className='flex flex-col flex-1 p-4'>
                <div className='flex flex-row justify-between items-center pb-4'>
                    <div className='flex flex-none font-semibold leading-none tracking-tight text-2xl'>
                        Async Thunk State API
                    </div>
                    <DialogCreatePost />
                </div>
                {counterReducer.LoadingPost ? <PostSkeleton /> : <ScrollArea className='h-svh pb-8'>
                    <div className=''>
                        {counterReducer.Posts.map((e) => (
                            <div key={e.id} >
                                <div className='flex flex-col p-2 bg-slate-50 m-2 rounded-md'>
                                    <div className='flex flex-row'>
                                        <div className='p-4'>
                                            <Avatar className='bg-primary'>
                                                <AvatarFallback className='bg-primary text-white font-bold text-lg'>{e.id}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex flex-none font-semibold leading-none tracking-tight'>
                                                {e.title}
                                            </div>
                                            <div className='text-sm text-muted-foreground'>
                                                {e.body}
                                            </div>
                                        </div>
                                        <DropdownMenu open={openDropdownId === e.id} onOpenChange={(isOpen) => handleDropdownChange(isOpen ? e.id : null)}>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuGroup className='text-muted-foreground'>
                                                    <DropdownMenuItem onClick={() => {
                                                        router.push(`${AppRouter.counter}/${e.id}`)
                                                    }}>
                                                        Info
                                                        <DropdownMenuShortcut><Info className='w-4 text-primary' /></DropdownMenuShortcut>
                                                    </DropdownMenuItem>
                                                    <DialogUpdatePost post={e} closeDropdown={() => handleDropdownChange(null)} />
                                                    <AlertDelete id={e.id.toString()} />
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div >

                            </div>
                        ))}
                    </div>
                </ScrollArea>}
            </div >
        </MaxWidthWrapper >
    )
}
