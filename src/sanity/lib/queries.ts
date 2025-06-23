import { defineQuery } from "next-sanity";

// src/sanity/lib/queries.ts
export const STARTUPS_QUERY = `*[_type == "startup"]{
  _id,
  _type,
  _createdAt,
  _updatedAt,
  _rev,
  title,
  slug,
  views,
  description,
  category,
  image,
  pitch,
  author->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    id,
    name,
    username,
    email,
    image,
    bio
  }
}`;
