import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { fadeIn } from "@/utils";
import { IconStar } from "../../user-interfaces";

type CardProps = {
  index?: number;
  id: number;
  urlImage: string;
  title: string;
  year: string;
  ratings: number;
  genre: string;
};

export function Card(props: CardProps) {
  const { index, id, urlImage, title, year, ratings, genre } = props;

  return (
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
          <Link
            href={`/${id}`}
            className="cursor-pointer rounded-full bg-[#FF0000] px-8 py-2 text-sm font-bold text-white"
          >
            View
          </Link>
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
  );
}
