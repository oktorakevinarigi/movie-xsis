import { Header, Footer, SimpleBlock } from "@/components/layouts";
import { ListMovies } from "../feature";

export function MoviesPage() {
  return (
    <>
      <Header />
      <SimpleBlock className="py-14">
        <ListMovies />
      </SimpleBlock>
      <Footer />
    </>
  );
}
