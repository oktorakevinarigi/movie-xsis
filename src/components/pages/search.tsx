import { Header, Footer } from "@/components/layouts";
import { SearchMovies } from "../feature";

export function SearchPage() {
  return (
    <>
      <Header />
      <div className="mb-10 flex flex-col gap-[18px] px-5 sm:px-10">
        <SearchMovies />
      </div>
      <Footer />
    </>
  );
}
