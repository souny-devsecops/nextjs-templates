"use client"

import React from 'react'
import { useRouter } from 'next/router'
import PostDetail from '@/cores/feature/counter/views/pages/post_detail_page'

export default function Page({ params }: { params: { slug: string } }) {
    return <PostDetail id={params.slug} />
}
