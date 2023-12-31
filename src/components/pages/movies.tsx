import { Header, Footer } from "@/components/layouts";
import { ListMovies } from "../feature";

export function MoviesPage() {
  return (
    <>
      <Header />
      <div className="mb-10 flex flex-col gap-[18px] px-5 sm:px-10">
        <ListMovies />
      </div>
      <Footer />
    </>
  );
}
