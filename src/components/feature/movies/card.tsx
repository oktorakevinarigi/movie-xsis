import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";

import { API_KEY } from "@/constants";
import { fadeIn } from "@/utils";
import { YoutubeSection } from "@/components/general";
import { useGetMovieVideos } from "./movie-queries";
import { IconStar, CloseIcon } from "../../user-interfaces";
const Modal = dynamic(() => import("@/components/user-interfaces").then(m => m.Modal), {
  ssr: false,
});

type CardProps = {
  index?: number;
  id: number;
  urlImage: string;
  title: string;
  year: string;
  ratings: number;
  genre: string;
  overview: string;
};

export function Card(props: CardProps) {
  const { index, id, urlImage, title, year, ratings, genre, overview } = props;
  const [modal, setModal] = useState({ visible: false, movieId: "", title: "", description: "" });

  const getMovieVideos = useGetMovieVideos(
    { api_key: API_KEY, movie_id: modal.movieId },
    { enabled: modal.visible },
  );

  function onWatch() {
    setModal({ visible: true, movieId: id.toString(), title, description: overview });
  }

  function onClose() {
    setModal({ visible: false, movieId: "", title: "", description: "" });
  }

  return (
    <>
      <motion.div variants={fadeIn("right", "spring", index ? index * 0.5 : 0, 0.75)}>
        <div className="group relative mb-3 h-[330px] overflow-hidden rounded-xl">
          <Image
            src={urlImage || "/images/no-images.jpg"}
            alt={title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="330px"
          />
          <div className="hidden rounded-xl group-hover:absolute group-hover:left-0 group-hover:right-0 group-hover:top-0 group-hover:z-20 group-hover:flex group-hover:h-[330px] group-hover:flex-col group-hover:items-center group-hover:justify-center group-hover:gap-12 group-hover:bg-black group-hover:bg-opacity-80">
            {ratings ? (
              <div className="flex items-center gap-1">
                <IconStar width="18px" height="18px" />
                <p className="text-lg font-bold text-white">{ratings.toFixed(1)}</p>
              </div>
            ) : null}
            <p className="px-2 text-center text-white">{genre}</p>
            <div className="flex gap-2">
              <Link
                href={`/${id}`}
                className="cursor-pointer rounded-full bg-white px-4 py-2 text-sm font-bold"
              >
                View
              </Link>
              <button
                onClick={onWatch}
                className="px-4 py-2 rounded-full bg-[#FF0000] text-sm font-semibold text-white cursor-pointer"
              >
                Watch
              </button>
            </div>
          </div>
          {ratings ? (
            <div className="absolute right-0 top-0 z-10 flex h-8 min-w-[40px] items-center justify-center gap-1 rounded-bl-xl bg-[#1E232B] bg-opacity-80 px-2">
              <IconStar width="18px" height="18px" />
              <p className="text-white">{ratings.toFixed(1)}</p>
            </div>
          ) : null}
        </div>

        <p className="line-clamp-2 font-semibold text-white">{title}</p>
        <p className="text-sm text-[#707070]">{year}</p>
      </motion.div>

      {modal.visible && getMovieVideos.data && (
        <Modal onClose={onClose} isOpen={modal.visible}>
          <div className="text-white bg-gray-700 p-5 rounded-md sm:w-[600px] w-auto">
            <div className="flex justify-end mb-4 cursor-pointer" onClick={onClose}>
              <CloseIcon height={"25px"} width={"25px"} />
            </div>
            <YoutubeSection
              id={getMovieVideos.data.results.find(movie => movie.type === "Trailer")?.key || ""}
            />
            <p className="font-semibold mt-4 mb-2">{modal.title}</p>
            <p className="text-sm">{modal.description}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
