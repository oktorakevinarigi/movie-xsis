import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils/query-client";
import { fetchNode } from "@/utils";
import {
  MovieGenresKeys,
  getMovieGenres,
  getMovieDiscover,
  MovieDiscoverKeys,
} from "@/components/feature";
import { MoviesPage } from "@/components/pages";
import { API_KEY } from "@/constants";

type MoviesProps = {
  searchParams: {
    genre: string;
    page: string;
    sort: string;
  };
};

export default async function Movies(props: MoviesProps) {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const queryDiscover = {
    api_key: API_KEY,
    language: "",
    page: "1",
    with_genres: props.searchParams.genre || "",
    sort_by: props.searchParams.sort || "",
  };
  const queryGenre = { api_key: API_KEY, language: "en" };

  await Promise.all([
    queryClient.fetchInfiniteQuery(
      MovieDiscoverKeys.infiniteList(queryDiscover),
      async () =>
        await getMovieDiscover({
          fetch,
          query: queryDiscover,
        }),
    ),
    queryClient.prefetchQuery(MovieGenresKeys.list(queryGenre), () =>
      getMovieGenres({ query: queryGenre, fetch }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <MoviesPage />
    </Hydrate>
  );
}
