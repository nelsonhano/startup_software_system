import { defineQuery } from "next-sanity";

// src/sanity/lib/queries.ts
export const STARTUPS_QUERY = `*[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ]{
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


export const STARTUPS_QUERY_BY_ID = `*[_type == 'startup' && _id == $id][0]{
  _id,
  _createdAt, 
  title, 
  slug, 
  author -> { _id, name, slug, image, bio }, 
  category, 
  description, 
  image, 
  views,
  pitch
}`