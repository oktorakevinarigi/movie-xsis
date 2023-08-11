"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Highlighter from "react-highlight-words";

import { useDebounce } from "@/utils";
import { IconSearch, IconSearchMovie, IconMovie } from "@/components/user-interfaces";
import { API_KEY } from "@/constants";

import { useGetMovieSearch } from "../feature";
import { Spinner } from "./spinner";

export function Header() {
  const [search, setSearch] = useState("");
  const [isList, setIsList] = useState(false);
  const deb = useDebounce(search, 500);

  const getMovieSearch = useGetMovieSearch(
    {
      api_key: API_KEY,
      query: deb,
      include_adult: false,
      language: "en-US",
      primary_release_year: "",
      page: "1",
      region: "",
      year: "",
    },
    { enabled: !!deb },
  );

  const boxListRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handlerClickToogle(event: Event) {
      const container = document.getElementById("container") as HTMLElement;
      if (!container.contains(event.target as HTMLElement)) {
        setIsList(false);
        setSearch("");
      }
    }
    document.addEventListener("click", handlerClickToogle);
    return () => {
      document.removeEventListener("click", handlerClickToogle);
    };
  }, []);

  function onChangeSearch(value: string) {
    setSearch(value);
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
        <div className="relative h-10 max-sm:mx-5 max-sm:w-full">
          <IconSearchMovie className="absolute left-3 top-1/2 -translate-y-[50%]" />
          <input
            id="container"
            ref={boxListRef}
            type="text"
            className="h-10 w-full rounded-xl bg-[#272727] bg-opacity-40 px-10 text-sm text-white shadow-[0px_2px_12px_7px_rgba(0,0,0,0.25)] outline-none sm:w-[450px] md:w-[500px]"
            placeholder="search any movies....."
            onChange={e => onChangeSearch(e.target.value)}
            onClick={() => setIsList(true)}
            value={search}
          />
          <IconSearch className="absolute right-3 top-1/2 -translate-y-[50%]" />

          {/* List Search */}
          {isList && (
            <div className="absolute left-0 top-11 z-50 w-full">
              <div className="inset-0 flex w-full items-end justify-center text-center sm:items-center">
                <div className="max-h-[300px] w-full transform space-y-2 overflow-y-auto rounded-lg bg-black bg-opacity-80 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:p-6 sm:pb-4">
                  {getMovieSearch.isFetching ? (
                    <Spinner />
                  ) : getMovieSearch.data?.results.length ? (
                    getMovieSearch.data?.results.map(item => {
                      if (item.poster_path) {
                        return (
                          <Link
                            key={item.id}
                            href={`/${item.id}`}
                            tabIndex={0}
                            className="flex cursor-pointer justify-between p-2 text-white hover:bg-white hover:bg-opacity-30"
                          >
                            <Highlighter
                              highlightClassName="font-semibold bg-transparent text-white"
                              searchWords={[deb]}
                              textToHighlight={item.title}
                              className="line-clamp-1 text-sm font-light"
                            />
                          </Link>
                        );
                      }
                    })
                  ) : (
                    <div className="flex h-20 items-center justify-center text-sm text-slate-600 dark:text-slate-400">
                      No results found
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
