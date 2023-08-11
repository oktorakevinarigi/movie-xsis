"use client";
import { useParams } from "next/navigation";
import dayjs from "dayjs";

import { API_KEY } from "@/constants";
import { IconStar } from "../../user-interfaces";
import { useGetMovieReviews } from "./movie-queries";

type ICardReview = {
  name: string;
  date: string;
  ratings: number | null;
  content: string;
};

function CardReview(item: ICardReview) {
  return (
    <div className="w-full rounded-[14px] bg-[#F9F9F9] p-6 sm:w-[582px]">
      <div className="mb-6 flex justify-between">
        <div>
          <p className="text-sm font-bold">{item.name}</p>
          <p className="text-gray-default text-xs">{item.date}</p>
        </div>
        {item.ratings ? (
          <div className="flex gap-[6px] rounded-md bg-[#C4C4C4] bg-opacity-20 p-1">
            <IconStar className="mt-2" />
            <p className="text-4xl font-semibold">{item.ratings}</p>
          </div>
        ) : null}
      </div>
      <p className="text-sm italic ">{item.content}</p>
    </div>
  );
}

export function Review() {
  const router = useParams();
  const id = router.id as string;
  const getMovieReviews = useGetMovieReviews({ api_key: API_KEY, movie_id: id });

  if (!getMovieReviews.data?.results.length) {
    return null;
  }

  return (
    <>
      <p className="mb-6 text-sm font-semibold text-[#F00]">REVIEWS</p>

      <div className="flex flex-col justify-between gap-[34px] sm:flex-row">
        {getMovieReviews.data?.results
          .slice(0, 2)
          .map(item => (
            <CardReview
              key={item.id}
              name={item.author_details.name}
              date={item.updated_at ? dayjs(item.updated_at).format("MMMM DD, YYYY") : ""}
              content={item.content}
              ratings={item.author_details.rating}
            />
          ))}
      </div>
    </>
  );
}
