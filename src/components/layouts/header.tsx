"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { IconSearch, IconSearchMovie, IconMovie } from "@/components/user-interfaces";

export function Header() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q");
  const [search, setSearch] = useState(query || "");

  function onChangeSearch(value: string) {
    setSearch(value);
  }

  function onSearch(e?: React.FormEvent<HTMLFormElement>) {
    if (e) {
      e.preventDefault();
    }
    router.push(`/search?q=${search}`);
  }

  return (
    <div className="flex w-full py-8">
      <div className="justify-between flex px-5 sm:px-10 w-full">
        <div className="text-white gap-8 items-center hidden sm:flex">
          <Link href="/" className="sm:block hidden">
            <IconMovie />
          </Link>
          <p>Series</p>
          <Link href="/movies">Movies</Link>
          <p>Genres</p>
        </div>
        <form onSubmit={onSearch} className="relative h-10 max-sm:mx-5 max-sm:w-full">
          <IconSearchMovie className="absolute left-3 top-1/2 -translate-y-[50%]" />
          <input
            id="container"
            type="text"
            className="h-10 w-full rounded-xl bg-[#272727] bg-opacity-40 px-10 text-sm text-white shadow-[0px_2px_12px_7px_rgba(0,0,0,0.25)] outline-none sm:w-[450px] md:w-[500px]"
            placeholder="search any movies....."
            onChange={e => onChangeSearch(e.target.value)}
            value={search}
          />
          <IconSearch
            className="absolute right-3 top-1/2 -translate-y-[50%] cursor-pointer"
            onClick={() => onSearch()}
          />
        </form>
      </div>
    </div>
  );
}
