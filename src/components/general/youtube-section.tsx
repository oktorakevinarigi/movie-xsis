import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

export interface YoutubeSectionProps {
  id: string;
  title?: string;
  isMobile?: boolean;
}

export function YoutubeSection(props: YoutubeSectionProps) {
  const { title, id, isMobile } = props;

  return (
    <div className="w-full">
      {title ? <p className="mb-4 text-3xl font-semibold">{title}</p> : null}
      {isMobile ? (
        <LiteYouTubeEmbed id={id} title={title ?? "Youtube Video"} />
      ) : (
        <div className="w-[560px]">
          <LiteYouTubeEmbed id={id} title={title ?? "Youtube Video"} />
        </div>
      )}
    </div>
  );
}
