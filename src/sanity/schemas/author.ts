import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "id",
            type: "number",
        }),
        defineField({
            name: "name",
            type: "string",
        }),
        defineField({
            name: "username",
            type: "string",
        }),
        defineField({
            name: "email",
            type: "string",
        }),
        defineField({
            name: "image",
            title: "Profile Image",
            type: "object",
            fields: [
                defineField({
                    name: "upload",
                    title: "Upload Image",
                    type: "image",
                }),
                defineField({
                    name: "url",
                    title: "Image URL",
                    type: "url",
                }),
            ],
        }),
        defineField({
            name: "bio",
            type: "text",
        }),
    ],
    preview: {
        select: {
            title: "name",
        },
    },
});
