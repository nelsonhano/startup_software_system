import Form from "next/form";
import SeachFormReset from "./SeachFormReset";
import { Search } from "lucide-react";

export default function SearchFormComp({ query }: { query?: string }) {
  
  return (
    <Form action="/" scroll={false} className="max-w-3xl w-full min-h-[80px] search-form bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5">
      <input 
        type="text" 
        name="query" 
        defaultValue="" 
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none" placeholder="Search Startups" 
      />

      <div className="flex gap-2">
        {query && <SeachFormReset />}

        <button type="submit" className="size-[50px] cursor-pointer rounded-full bg-black flex justify-center items-center !important text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}
