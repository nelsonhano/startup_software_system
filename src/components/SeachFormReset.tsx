"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function SeachFormReset() {
    const reset = () => {
        const form = document.querySelector(".search-form") as HTMLFormElement;
    
        if (form) form.reset();
      }
  return (
      <button type="reset" onClick={reset}>
        <Link href="/" className="size-[50px] cursor-pointer text-white rounded-full bg-black flex justify-center items-center !important">
          <X className="size-5" />
        </Link>
      </button>
  )
}
