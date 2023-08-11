"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";

import { getGenre } from "@/utils";
import { ULR_IMAGE, API_KEY } from "@/constants";
import { YoutubeSection } from "@/components/general";
import { Carousel, CloseIcon } from "../../user-interfaces";
import { useGetMoviePopular, useGetMovieGenres, useGetMovieVideos } from "./movie-queries";
const Modal = dynamic(() => import("@/components/user-interfaces").then(m => m.Modal), {
  ssr: false,
});

export function BannerMovie() {
  const [modal, setModal] = useState({ visible: false, movieId: "", title: "", description: "" });
  const router = useRouter();
  const query = { api_key: API_KEY, language: "en-US", page: "1", region: "" };
  const getMoviePopular = useGetMoviePopular(query);
  const getMovieGenres = useGetMovieGenres({ api_key: API_KEY, language: "en" });
  const getMovieVideos = useGetMovieVideos(
    { api_key: API_KEY, movie_id: modal.movieId },
    { enabled: modal.visible },
  );

  function onWatch(movieId: string, title: string, description: string) {
    setModal({ visible: true, movieId, title, description });
  }

  function onClose() {
    setModal({ visible: false, movieId: "", title: "", description: "" });
  }

  function onDetail(id: string) {
    router.push(`/${id}`);
  }

  return (
    <>
      <Carousel
        slides={getMoviePopular.data?.results.slice(0, 6) || []}
        options={{ loop: true }}
        renderSlide={({ slide }) => (
          <div
            key={slide.id}
            onClick={() => {
              onDetail(slide.id.toString());
            }}
            className="flex h-[290px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-black sm:ml-10 sm:w-[500px] lg:w-[704px]"
          >
            <div className="relative hidden flex-[1.5] before:absolute before:inset-0 before:z-10 before:bg-gradient-to-l before:from-black before:from-[5%] before:to-transparent before:to-[95%] sm:block">
              <Image
                src={ULR_IMAGE + slide.poster_path}
                alt={slide.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="400px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <p className="mb-2 line-clamp-2 text-4xl font-bold text-white">{slide.title}</p>
                <div className="mb-2 flex items-center gap-1 font-normal">
                  <p className="text-xs text-white">
                    {slide.release_date ? dayjs(slide.release_date).format("YYYY") : null}
                  </p>
                  <div className="h-[6px] w-[6px] rounded-full bg-white bg-opacity-50" />
                  <p className="line-clamp-2 text-xs text-white">
                    {getGenre(slide.genre_ids, getMovieGenres.data?.genres || [])}
                  </p>
                </div>
                <p className="mb-4 line-clamp-4 text-xs font-light text-[#6A6A6A]">
                  {slide.overview}
                </p>
              </div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  onWatch(slide.id.toString(), slide.title, slide.overview);
                }}
                className="h-9 w-[97px] rounded-[10px] bg-[#F00F00] text-xl font-semibold text-white shadow-[1px_1px_14px_0px_#F00]"
              >
                Watch
              </button>
            </div>
          </div>
        )}
      />

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
