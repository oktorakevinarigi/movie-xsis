"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

import { ULR_IMAGE, API_KEY } from "@/constants";
import { IconStar } from "../../user-interfaces";
import { SimpleBlock } from "../../layouts/simple-block";
import { useGetMovieDetail } from "./movie-queries";

function Divider() {
  return <div className="h-10 border-r border-white border-opacity-20" />;
}

export function BannerDetail() {
  const router = useParams();
  const id = router.id as string;
  const getMovieDetail = useGetMovieDetail({
    api_key: API_KEY,
    movie_id: id,
    language: "en-US",
    append_to_response: "",
  });

  return (
    <>
      <div className="relative mb-8 h-[468px] bg-red-400">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-[#0E1723] bg-opacity-50" />
        <Image
          src={
            getMovieDetail.data?.backdrop_path
              ? ULR_IMAGE + getMovieDetail.data?.backdrop_path
              : "/images/no-images.jpg"
          }
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          alt={getMovieDetail.data?.title || ""}
          priority
        />

        <SimpleBlock>
          <div className="absolute bottom-48 z-30 flex lg:-bottom-28">
            <Image
              src={
                getMovieDetail.data?.poster_path
                  ? ULR_IMAGE + getMovieDetail.data?.poster_path
                  : "/images/no-images.jpg"
              }
              width={220}
              height={330}
              alt={getMovieDetail.data?.title || ""}
              priority
              className="hidden lg:block"
            />
            <div className="mt-5 text-white lg:ml-[30px]">
              <p className="text-lg">2020</p>
              <p className="text-4xl">{getMovieDetail.data?.title}</p>
              <p className="text-sm">
                {getMovieDetail.data?.genres.map(item => item.name).join(", ")}
              </p>
            </div>
          </div>
        </SimpleBlock>

        <div className="absolute bottom-0 left-0 right-0 z-20 bg-black bg-opacity-50">
          <SimpleBlock>
            <div className="flex h-20 items-center gap-8 overflow-x-auto lg:ml-[250px]">
              <div className="flex items-center">
                <div className="mr-3 flex items-center gap-4">
                  <IconStar height="32px" width="32px" />
                  <p className="text-4xl text-white">{getMovieDetail.data?.vote_average}</p>
                </div>
                <div className="min-w-[80px] text-xs uppercase">
                  <p className="font-medium text-white text-opacity-50">User Score</p>
                  <p className="text-white">{getMovieDetail.data?.vote_count} Votes</p>
                </div>
              </div>
              <Divider />
              <div className="text-xs uppercase">
                <p className="font-medium text-white text-opacity-50">Status</p>
                <p className="text-white">{getMovieDetail.data?.status}</p>
              </div>
              <Divider />
              <div className="text-xs uppercase">
                <p className="font-medium text-white text-opacity-50">language</p>
                <p className="text-white">{getMovieDetail.data?.original_language}</p>
              </div>
              <Divider />
              <div className="text-xs uppercase">
                <p className="font-medium text-white text-opacity-50">budget</p>
                <p className="text-white">${getMovieDetail.data?.budget}</p>
              </div>
              {getMovieDetail.data?.production_companies.length ? (
                <>
                  <Divider />
                  <div className="text-xs uppercase">
                    <p className="font-medium text-white text-opacity-50">production</p>
                    <p className="line-clamp-2 break-words text-white">
                      {getMovieDetail.data?.production_companies.map(item => item.name).join(", ")}
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </SimpleBlock>
        </div>
      </div>

      <SimpleBlock className="w-full text-sm">
        <div className="lg:ml-[250px] lg:max-w-[526px]">
          <p className="font-semibold text-[#F00]">OVERVIEW</p>
          <p className="leading-7">{getMovieDetail.data?.overview}</p>
        </div>
      </SimpleBlock>
    </>
  );
}
