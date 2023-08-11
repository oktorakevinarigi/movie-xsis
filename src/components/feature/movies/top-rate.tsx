"use client";
import Image from "next/image";
import Link from "next/link";

import { ULR_IMAGE, API_KEY } from "@/constants";
import { getGenre } from "@/utils";
import { useGetMovieTopRate, useGetMovieGenres } from "./movie-queries";

export function TopRate() {
  const query = { api_key: API_KEY, language: "en-US", page: "1", region: "" };
  const getMovieTopRate = useGetMovieTopRate(query);
  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-white">Movies Top Rate</p>

      <div className="w-full overflow-x-auto py-1">
        <div className="flex gap-4">
          {getMovieTopRate.data?.results.slice(0, 10).map(movie => (
            <Link
              key={movie.id}
              href={`/${movie.id}`}
              className="flex min-h-[102px] w-[168px] min-w-[168px] flex-col gap-1 rounded-xl bg-[#343434] p-3"
            >
              <div className="relative h-[28px] w-[39px] overflow-hidden rounded-md">
                <Image
                  src={movie.poster_path ? ULR_IMAGE + movie.poster_path : "/images/no-images.jpg"}
                  alt={movie.title}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="39px"
                />
              </div>
              <p className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</p>
              <p className="line-clamp-2 text-xs font-light text-[#656565]">
                {getGenre(movie.genre_ids, getMovieGenres.data?.genres || [])}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
