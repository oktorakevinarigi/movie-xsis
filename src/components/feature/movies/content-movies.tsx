"use client";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { getGenre } from "@/utils";
import { ULR_IMAGE, API_KEY } from "@/constants";
import { Spinner } from "../../general";
import { useGetInfiniteMovieDiscover, useGetMovieGenres } from "./movie-queries";
import { Card } from "./card";

export function ContentMovies() {
  const searchParams = useSearchParams();
  const genre = searchParams.get("genre");
  const sort = searchParams.get("sort");

  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  const getMovieDiscover = useGetInfiniteMovieDiscover(
    {
      api_key: API_KEY,
      language: "",
      page: "1",
      sort_by: sort || "",
      with_genres: genre || "",
    },
    { keepPreviousData: true, staleTime: Infinity },
  );

  function onLoadMore() {
    getMovieDiscover.fetchNextPage();
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(205px,1fr))] gap-5">
        {getMovieDiscover.data?.pages
          .map(page => page.results ?? [])
          .flat()
          .map(item => (
            <div key={item.id}>
              <Card
                id={item.id}
                urlImage={item.poster_path ? ULR_IMAGE + item.poster_path : ""}
                genre={getGenre(item.genre_ids, getMovieGenres.data?.genres || [])}
                ratings={item.vote_average}
                title={item.title}
                year={item.release_date ? dayjs(item.release_date).format("YYYY") : ""}
              />
            </div>
          ))}
      </div>
      <div className="flex w-full flex-col justify-center">
        {getMovieDiscover.isFetching ? <Spinner /> : null}
        {getMovieDiscover.hasNextPage ? (
          <button
            className="m-auto mt-5 w-[151px] rounded-full bg-[#F00] py-2 text-sm font-semibold text-white"
            onClick={onLoadMore}
          >
            Load More
          </button>
        ) : null}
      </div>
    </div>
  );
}
