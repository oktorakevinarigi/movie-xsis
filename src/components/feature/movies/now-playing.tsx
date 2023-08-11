"use client";
import dayjs from "dayjs";

import { getGenre } from "@/utils";
import { Spinner } from "@/components/general";
import { ULR_IMAGE, API_KEY } from "@/constants";
import { useGetMovieNowPlaying, useGetMovieGenres } from "./movie-queries";
import { Card } from "./card";

type IGetCard = {
  id: number;
  poster_path: string | null;
  title: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

function getCard(item: IGetCard, genres: { id: number; name: string }[]) {
  return (
    <div key={item.id}>
      <Card
        id={item.id}
        urlImage={item.poster_path ? ULR_IMAGE + item.poster_path : ""}
        title={item.title}
        year={item.release_date ? dayjs(item.release_date).format("YYYY") : ""}
        ratings={item.vote_average}
        genre={getGenre(item.genre_ids, genres || [])}
      />
    </div>
  );
}

export function NowPlaying() {
  const query = { api_key: API_KEY, language: "en-US", page: "1", region: "" };
  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  const getMovieNowPlaying = useGetMovieNowPlaying(query);

  return (
    <>
      <p className="mb-4 text-sm font-semibold text-white">Now Playing</p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(205px,1fr))] gap-10">
        {getMovieNowPlaying.isLoading ? (
          <div className="mb-9 flex w-full justify-center">
            <Spinner />
          </div>
        ) : (
          getMovieNowPlaying.data?.results
            .slice(0, 8)
            .map(item => getCard(item, getMovieGenres.data?.genres || []))
        )}
      </div>
    </>
  );
}
