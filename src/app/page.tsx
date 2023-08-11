import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/query-client";
import { fetchNode } from "@/utils";
import { HomePage } from "@/components/pages";
import {
  getMoviePopular,
  MoviePopularKeys,
  getMovieGenres,
  MovieGenresKeys,
  getMovieNowPlaying,
  MovieNowPlayingKeys,
  getMovieTopRate,
  MovieTopRateKeys,
} from "@/components/feature";
import { API_KEY } from "@/constants";

export default async function Home() {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const queryGenre = { api_key: API_KEY, language: "en" };
  const query = { api_key: API_KEY, language: "en-US", page: "1", region: "" };

  await Promise.all([
    queryClient.prefetchQuery(MoviePopularKeys.list(query), () =>
      getMoviePopular({ query: query, fetch }),
    ),
    queryClient.prefetchQuery(MovieNowPlayingKeys.list(query), () =>
      getMovieNowPlaying({ query: query, fetch }),
    ),
    queryClient.prefetchQuery(MovieTopRateKeys.list(query), () =>
      getMovieTopRate({ query: query, fetch }),
    ),
    queryClient.prefetchQuery(MovieGenresKeys.list(queryGenre), () =>
      getMovieGenres({ query: queryGenre, fetch }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomePage />
    </Hydrate>
  );
}
