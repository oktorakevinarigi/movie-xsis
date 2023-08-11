import { Header, Footer } from "@/components/layouts";
import { BannerMovie, TopRate, NowPlaying } from "../feature";

export function HomePage() {
  return (
    <>
      <div>
        <Header />
        <div className="my-8 w-full px-5 sm:px-0">
          <BannerMovie />
        </div>
        <div className="mb-10 flex flex-col gap-[18px] px-5 sm:px-10">
          <TopRate />
          <NowPlaying />
        </div>
      </div>
      <Footer />
    </>
  );
}
