import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Button } from "./ui/button";
import { Author, Startup } from "../../sanity.types";


export type StartUpTypeCard = Omit<Startup, "author"> & { author: Author }

export default function StartUpCards({ post }: { post: StartUpTypeCard }) {
    const {
        _createdAt,
        views,
        _id,
        author,
        description,
        image,
        category,
        title
    } = post;      

return (
    <li className="group bg-white border-[5px] hover:border-pink-700 border-black py-6 px-5 rounded-[22px] shadow-200 transition-all duration-500 hover:shadow-300 hover:bg-pink-500/15 ">
        <div className="flex justify-between items-center">
            <p className="font-medium text-[16px] bg-primary-100 py-2 rounded-full group-hover:bg-white-100">
                {formatDate(post._createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-pink-700"/>
                <span>{views}</span>
            </div>
        </div>

        <div className="flex justify-between items-center">
            <div className="flex-1">
                <Link href={`/user/${author.id}`}>
                    <p className="text-lg font-light line-clamp-1">{author.name}</p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-2xl font-semibold">
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author.id}`}>
                <Image
                    src={image|| ""}
                    alt={`${author.name}'s startup image`}
                    width={48}
                    height={48}
                    className="rounded-full"
                />

            </Link>
        </div> 
        
        <Link href={`/startup/${_id}`}>
            <p className="font-normal text-[16px] line-clamp-2 my-3 text-black-100 break-all">
                {description}
            </p>

            <img src={image} alt="placeholder" className="w-full h-[164px] rounded-[10px] object-cover" />
        </Link>

        <div className="flex justify-between items-center gap-3 mt-5">
            <Link href={`/?query=${category?.toLocaleLowerCase()}`}>
                <p className="text-lg">{category}</p>
            </Link>
            <Button className="flex justify-between items-center">
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
)}
