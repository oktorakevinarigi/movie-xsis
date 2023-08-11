"use client";
import React from "react";
import Link from "next/link";

import { API_KEY } from "@/constants";
import { useGetMovieGenres } from "./movie-queries";

export function CategoriesMovie() {
  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  return (
    <>
      <p className="mb-8 text-sm font-light text-[#707070]">Categories</p>
      <div className="flex flex-col gap-3">
        {getMovieGenres.data?.genres.slice(0, 6).map(genre => (
          <Link key={genre.id} href={`/movies?genre=${genre.id}`}>
            <p className="text-sm font-semibold text-[#888888] hover:text-white">{genre.name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
