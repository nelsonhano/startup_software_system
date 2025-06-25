// app/startup/[id]/page.tsx

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { client } from '@/sanity/lib/client';
import { STARTUPS_QUERY_BY_ID } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { auth } from '@/auth';

export const experimental_ppr = true;

export default async function page({ params }: { params: { id: string } }) {
    const { id } = params;
    const post = await client.fetch(STARTUPS_QUERY_BY_ID, { id });

    const session = await auth()

    if (!post) return notFound();
    return (
        <>
            <section className="w-full bg-pink-700 pattern flex justify-center items-center flex-col py-10 px-6 overflow-hidden min-h-[230px]">
                <p className="bg-yellow-300 px-6 py-3 font-work-sans font-bold rounded-sm uppercase relative tag-tri">
                    {formatDate(post._createdAt)}
                </p>

                <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
                    {post.title}
                </h1>
                <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
                    {post.description}
                </p>
            </section>

            <section className="px-6 py-10 max-w-7xl mx-auto">
                <img
                    src={post.image || ""}
                    alt="thumbnail"
                    className="w-full h-auto rounded-xl border-2 border-pink-500 p-4"
                />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex justify-between gap-5">
                        <Link
                            href={`/user/${post.author?._id}`}
                            className="flex gap-2 items-center mb-3"
                        >
                            <Image
                                src={post.author?.image?.url || ""}
                                alt="avatar"
                                width={64}
                                height={34}
                                className="rounded-full h-2/5 drop-shadow-lg"
                            />

                            <div className="leading-tight">
                                <p className="font-medium text-[20px] text-black">{post.author?.name}</p>
                                <p className="font-medium text-[16px] text-black/50">@{post.author?.username}</p>
                            </div>
                        </Link>

                        <div className="flex items-center justify-center h-full w-full overflow-hidden">
                            <p className="font-medium bg-pink-300 px-3 py-1 rounded-md max-w-full truncate">
                                {post.category}
                            </p>
                        </div>
                    </div>

                    <h3 className="text-[30px] font-bold text-black">Startup Details</h3>

                    {post.pitch ? (
                        <article className="prose prose-lg dark:prose-invert">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                rehypePlugins={[rehypeRaw]}
                            >
                                {post.pitch}
                            </ReactMarkdown>
                        </article>
                    ) : (
                        <p className="text-black-100 text-sm font-normal">No details provided</p>
                    )}
                </div>

                <hr className=' divide-red-950' />

                <Suspense fallback={<Skeleton className='bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3' />}>
                    <View id={id} />
                </Suspense>
            </section>
        </>
    );
}
