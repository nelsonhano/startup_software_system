import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

import { STARTUPS_QUERY_BY_ID } from "@/sanity/lib/queries";
import { formatDate } from "@/sanity/lib/utils";

export const experimental_ppr = true; 

export default async function page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
    const post = await client.fetch(STARTUPS_QUERY_BY_ID, { id });
    console.log(post.author.image.url);
    

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
                <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl border-2 border-pink-500 p-4" />

                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author._id}`} className="flex gap-2 items-center mb-3">
                            <Image 
                                src={post.author.image.url}
                                alt="avater"
                                width={64}
                                height={64}
                                className="rounded-full drop-shadow-lg"
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}