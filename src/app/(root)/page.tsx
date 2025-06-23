import SearchFormComp from "@/components/SearchFormComp";
import StartUpCards, { StartUpTypeCard } from "@/components/StartUpCards";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string}> }) {
  const query = (await searchParams).query;

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY});

  return (
  <>
      <section className="w-full bg-pink-700 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6 overflow-hidden">
        <h1 className="uppercase w-full bg-black px-3 py-3 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[29px] leading-[46px] max-w-5xl text-center my-5">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition.
        </p>

        <SearchFormComp query={query} />
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-4xl font-bold">
          {query ? (
            <>
              Search result for: <span className="text-pink-700">{query}</span>
            </>
          ) : (
            "All Startups"
          )}
        </p>

        <ul className="mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: StartUpTypeCard)=> (
              <StartUpCards key={post._id} post={post} />
            ))
          ) : <p className="text-2xl font-normal">No Startups found</p>}
        </ul>

      </section>
      <SanityLive />
  </>
  );
}
