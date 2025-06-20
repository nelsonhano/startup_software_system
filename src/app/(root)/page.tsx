import SearchFormComp from "@/components/SearchFormComp";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string}> }) {
  const query = (await searchParams).query;

  return (
  <>
      <section className="w-full bg-pink-700 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
        <h1 className="uppercase w-full bg-black px-6 py-3 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
        SearchFormComp.tsx Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competition.
        </p>

        <SearchFormComp query={query} />
      </section>
  </>
  );
}
