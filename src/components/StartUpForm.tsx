"use client";

import { useActionState, useState } from "react";
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from "next/navigation";
import { Send } from 'lucide-react';
import { toast } from "sonner";
import { z } from "zod";

import { formSchema } from '@/lib/validation';
import { Textarea } from "./ui/textarea";
import { Button } from './ui/button';
import { Input } from "./ui/input";

export default function StartUpForm() {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            await formSchema.parseAsync(formValues);

            // const result = await createPitch(prevState, formData, pitch);

            // if (result.status == "SUCCESS") {
            //     toast("Your startup pitch has been created successfully");

            //     router.push(`/startup/${result._id}`);
            // }

            // return result;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErorrs = error.flatten().fieldErrors;

                setError(fieldErorrs as unknown as Record<string, string>);

                toast("Please check your inputs and try again");

                return { ...prevState, error: "Validation failed", status: "ERROR" };
            }

            toast("An unexpected error has occurred");

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };
    const [state, formAction, isPending] = useActionState(handleSubmit, { error: "", status: "INITIAL"});

return (
    <form action={formAction} className="max-w-2xl mx-auto bg-white my-10 space-y-8 px-6">
        <div>
            <label htmlFor="title" className="font-bold text-[18px] text-black uppercase">Title</label>
            <Input 
                id="title"
                name="title"
                className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 "
                placeholder="Startup Title"
                required
            />
            {error.title && <p className="text-red-500 mt-2 ml-5">{error.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className="font-bold text-[18px] text-black uppercase">Description</label>
            <Textarea
                id="description"
                name="description"
                className="border-[3px] border-black p-5 text-[18px] text-black font-semibold rounded-[20px] mt-3 placeholder:text-black-300"
                placeholder="Startup Description"
                required
            />
            {error.description && <p className="text-red-500 mt-2 ml-5">{error.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className="font-bold text-[18px] text-black uppercase">Category</label>
            <Input
                id="category"
                name="category"
                className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 "
                placeholder="Startup Category (eg Tech, Healty, Category......)"
                required
            />
            {error.category && <p className="text-red-500 mt-2 ml-5">{error.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className="font-bold text-[18px] text-black uppercase">Image Url</label>
            <Input
                id="link"
                name="link"
                className="border-[3px] border-black px-5 py-7 text-[18px] text-black font-semibold rounded-full mt-3 placeholder:text-black-300 "
                placeholder="Startup Image Url"
                required
            />
            {error.link && <p className="text-red-500 mt-2 ml-5">{error.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="link" className="font-bold text-[18px] text-black uppercase">Pitch</label>
            <MDEditor
                value={pitch}
                onChange={(v) => setPitch(v as string)}
                id='pitch'
                preview='edit'
                height={300}
                style={{ borderRadius: 30, overflow: 'hidden'}}
                textareaProps={{placeholder: "Briefly describe your idea and what problem it solves"}}
                previewOptions={{ disallowedElements: ["style"] }}
            />
            {error.pitch && <p className="text-red-500 mt-2 ml-5">{error.pitch}</p>}
        </div>

        <Button disabled={isPending} className='bg-pink-700 border-[4px] text-white hover:bg-pink-600 transition border-black rounded-full p-5 min-h-[70px] w-full font-bold text-[18px]'>
            {isPending ? "Submiting...." : "Submit Your Pitch"}
            <Send size={6} className='ml-2'/>
        </Button>
    </form>
)
}
