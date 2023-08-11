import { ContentMovies } from "./content-movies";
import { Filter } from "./filter";

export function ListMovies() {
  return (
    <>
      <p className="mb-14 text-2xl font-semibold text-white">Movies</p>

      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <Filter />
        <ContentMovies />
      </div>
    </>
  );
}
