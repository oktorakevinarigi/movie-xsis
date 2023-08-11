"use client";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import { getGenre } from "@/utils";
import { ULR_IMAGE, API_KEY } from "@/constants";
import { useGetMovieRecommendations, useGetMovieGenres } from "./movie-queries";
import { Card } from "./card";

type RecommendationProps = {
  id: string;
};

export function Recommendation(props: RecommendationProps) {
  const { id } = props;
  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  const getMovieRecommendations = useGetMovieRecommendations({ api_key: API_KEY, movie_id: id });

  if (!getMovieRecommendations.data?.results.length) {
    return null;
  }

  return (
    <>
      <p className="mb-9 text-sm font-semibold text-white">RECOMMENDATION MOVIES</p>

      <motion.div
        variants={{ hidden: {}, show: {} }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid min-h-[70vh] grid-cols-[repeat(auto-fill,minmax(205px,1fr))] flex-col gap-5 lg:flex-row"
      >
        {getMovieRecommendations.data?.results.slice(0, 5).map((item, index) => (
          <div key={item.id}>
            <Card
              index={index}
              id={item.id}
              urlImage={item.poster_path ? ULR_IMAGE + item.poster_path : ""}
              title={item.title}
              genre={getGenre(item.genre_ids, getMovieGenres.data?.genres || [])}
              year={item.release_date ? dayjs(item.release_date).format("YYYY") : ""}
              ratings={item.vote_average}
            />
          </div>
        ))}
      </motion.div>
    </>
  );
}
