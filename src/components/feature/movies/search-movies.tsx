"use client";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";

import { getGenre } from "@/utils";
import { ULR_IMAGE, API_KEY } from "@/constants";
import { Spinner } from "@/components/general";
import { useGetInfiniteMovieSearch, useGetMovieGenres } from "./movie-queries";
import { Card } from "./card";

export function SearchMovies() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  const getMovieSearch = useGetInfiniteMovieSearch({
    api_key: API_KEY,
    query: query || "",
    include_adult: false,
    language: "en-US",
    primary_release_year: "",
    page: "1",
    region: "",
    year: "",
  });

  function onLoadMore() {
    getMovieSearch.fetchNextPage();
  }
  return (
    <>
      <p className="mb-14 text-2xl font-semibold text-white">Search Movies</p>
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="flex-1">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(205px,1fr))] gap-5">
            {getMovieSearch.data?.pages
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
                    overview={item.overview}
                  />
                </div>
              ))}
          </div>
          <div className="flex w-full flex-col justify-center">
            {getMovieSearch.isFetching ? <Spinner /> : null}
            {getMovieSearch.hasNextPage ? (
              <button
                className="m-auto mt-5 w-[151px] rounded-full bg-[#F00] py-2 text-sm font-semibold text-white"
                onClick={onLoadMore}
              >
                Load More
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
