import {
  useQuery,
  useInfiniteQuery,
  type UseQueryOptions,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import { FetcherArgs, cleanQuery, fetchBrowser, queryToString } from "@/utils";
import { URL_API } from "@/constants";
import {
  movieResponseSchema,
  movieDetailResponseSchema,
  movieSearchResponseSchema,
  movieGenresResponseSchema,
  movieRecommendationsResponseSchema,
  movieReviewsResponseSchema,
  movieVideosResponseSchema,
} from "./movie-model";

type ApiKeyQuery = {
  api_key: string;
};
type MovieQuery = {
  language: string;
  page: string;
  region: string;
} & ApiKeyQuery;
type MovieDetailQuery = {
  movie_id: string;
  append_to_response: string;
  language: string;
} & ApiKeyQuery;
type MovieSearchQuery = {
  query: string;
  include_adult: boolean;
  language: string;
  primary_release_year: string;
  page: string;
  region: string;
  year: string;
} & ApiKeyQuery;
type MovieGenresQuery = { language: string } & ApiKeyQuery;
type MovieRecomendationsQuery = { movie_id: string } & ApiKeyQuery;
type MovieReviewsQuery = { movie_id: string } & ApiKeyQuery;
type MovieDiscoverQuery = {
  language: string;
  page: string;
  with_genres: string;
  sort_by: string;
} & ApiKeyQuery;
type MovieVideoQuery = { movie_id: string } & ApiKeyQuery;

export const MoviePopularKeys = {
  all: ["MOVIE_POPULAR"],
  lists: () => [...MoviePopularKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MoviePopularKeys.lists(), cleanQuery(query)],
};
export const MovieUpcomingKeys = {
  all: ["MOVIE_UPCOMING"],
  lists: () => [...MovieUpcomingKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MovieUpcomingKeys.lists(), cleanQuery(query)],
};
export const MovieNowPlayingKeys = {
  all: ["MOVIE_NOW_PLAYING"],
  lists: () => [...MovieNowPlayingKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MovieNowPlayingKeys.lists(), cleanQuery(query)],
};
export const MovieTopRateKeys = {
  all: ["MOVIE_TOP_RATE"],
  lists: () => [...MovieTopRateKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MovieTopRateKeys.lists(), cleanQuery(query)],
};
export const MovieKeys = {
  all: ["MOVIE"],
  lists: () => [...MovieKeys.all, "LISTS"],
  list: (query: MovieQuery) => [...MovieKeys.lists(), cleanQuery(query)],
  details: () => [...MovieKeys.all, "DETAIL"],
  detail: (query: MovieDetailQuery) => [...MovieKeys.details(), cleanQuery(query)],
  searchs: () => [...MovieKeys.all, "DETAIL"],
  search: (query: MovieSearchQuery) => [...MovieKeys.searchs(), cleanQuery(query)],
};
export const MovieGenresKeys = {
  all: ["MOVIE_GENRES"],
  lists: () => [...MovieGenresKeys.all, "LISTS"],
  list: (query: MovieGenresQuery) => [...MovieGenresKeys.lists(), cleanQuery(query)],
};
export const MovieRecommendationsKeys = {
  all: ["MOVIE_RECOMMENDATIONS"],
  lists: () => [...MovieRecommendationsKeys.all, "LISTS"],
  list: (query: MovieRecomendationsQuery) => [
    ...MovieRecommendationsKeys.lists(),
    cleanQuery(query),
  ],
};
export const MovieReviewsKeys = {
  all: ["MOVIE_REVIEWS"],
  lists: () => [...MovieReviewsKeys.all, "LISTS"],
  list: (query: MovieReviewsQuery) => [...MovieReviewsKeys.lists(), cleanQuery(query)],
};
export const MovieDiscoverKeys = {
  all: ["MOVIE_DISCOVER"],
  infiniteLists: () => [...MovieDiscoverKeys.all, "INFINITE_LISTS"],
  infiniteList: (query: MovieDiscoverQuery) => [
    ...MovieDiscoverKeys.infiniteLists(),
    cleanQuery(query),
  ],
};
export const MovieVideoKeys = {
  all: ["MOVIE_VIDEO"],
  lists: () => [...MovieVideoKeys.all, "LISTS"],
  list: (query: MovieReviewsQuery) => [...MovieVideoKeys.lists(), cleanQuery(query)],
};

export const getMoviePopular = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const response = await fetch.get(`${URL_API}/3/movie/popular${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieResponseSchema.parse(response);
};
export type IMoviePopularFn = Awaited<ReturnType<typeof getMoviePopular>>;
export function useGetMoviePopular(query: MovieQuery, options?: UseQueryOptions<IMoviePopularFn>) {
  return useQuery<IMoviePopularFn>(
    MoviePopularKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMoviePopular({ fetch, query });
    },
    options,
  );
}

export const getMovieUpcoming = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const response = await fetch.get(`${URL_API}/3/movie/upcoming${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieResponseSchema.parse(response);
};
export type IMovieUpcomingFn = Awaited<ReturnType<typeof getMovieUpcoming>>;
export function useGetMovieUpcoming(
  query: MovieQuery,
  options?: UseQueryOptions<IMovieUpcomingFn>,
) {
  return useQuery<IMovieUpcomingFn>(
    MovieUpcomingKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieUpcoming({ fetch, query });
    },
    options,
  );
}

export const getMovieNowPlaying = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const response = await fetch.get(`${URL_API}/3/movie/now_playing${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieResponseSchema.parse(response);
};
export type IMovieNowPlayingFn = Awaited<ReturnType<typeof getMovieNowPlaying>>;
export function useGetMovieNowPlaying(
  query: MovieQuery,
  options?: UseQueryOptions<IMovieNowPlayingFn>,
) {
  return useQuery<IMovieNowPlayingFn>(
    MovieNowPlayingKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieNowPlaying({ fetch, query });
    },
    options,
  );
}

export const getMovieTopRate = async ({ fetch, query }: FetcherArgs<MovieQuery>) => {
  const response = await fetch.get(`${URL_API}/3/movie/top_rated${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieResponseSchema.parse(response);
};
export type IMovieTopRateFn = Awaited<ReturnType<typeof getMovieTopRate>>;
export function useGetMovieTopRate(query: MovieQuery, options?: UseQueryOptions<IMovieTopRateFn>) {
  return useQuery<IMovieTopRateFn>(
    MovieTopRateKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieTopRate({ fetch, query });
    },
    options,
  );
}

export const getMovieDetail = async ({ fetch, query }: FetcherArgs<MovieDetailQuery>) => {
  const { movie_id, ...rest } = query;
  const response = await fetch.get(`${URL_API}/3/movie/${movie_id}${queryToString(rest)}`, {
    next: { revalidate: 60 },
  });
  return movieDetailResponseSchema.parse(response);
};
export type IMovieDetailFn = Awaited<ReturnType<typeof getMovieDetail>>;
export function useGetMovieDetail(
  query: MovieDetailQuery,
  options?: UseQueryOptions<IMovieDetailFn>,
) {
  return useQuery<IMovieDetailFn>(
    MovieKeys.detail(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieDetail({ fetch, query });
    },
    options,
  );
}

export const getMovieSearch = async ({ fetch, query }: FetcherArgs<MovieSearchQuery>) => {
  const response = await fetch.get(`${URL_API}/3/search/movie${queryToString(query)}`);
  return movieSearchResponseSchema.parse(response);
};
export type IMovieSearchFn = Awaited<ReturnType<typeof getMovieSearch>>;
export function useGetMovieSearch(
  query: MovieSearchQuery,
  options?: UseQueryOptions<IMovieSearchFn>,
) {
  return useQuery<IMovieSearchFn>(
    MovieKeys.search(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieSearch({ fetch, query });
    },
    options,
  );
}

export const getMovieGenres = async ({ fetch, query }: FetcherArgs<MovieGenresQuery>) => {
  const response = await fetch.get(`${URL_API}/3/genre/movie/list${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieGenresResponseSchema.parse(response);
};
export type IMovieGenresFn = Awaited<ReturnType<typeof getMovieGenres>>;
export function useGetMovieGenres(
  query: MovieGenresQuery,
  options?: UseQueryOptions<IMovieGenresFn>,
) {
  return useQuery<IMovieGenresFn>(
    MovieGenresKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieGenres({ fetch, query });
    },
    options,
  );
}

export const getMovieRecommedations = async ({
  fetch,
  query,
}: FetcherArgs<MovieRecomendationsQuery>) => {
  const { movie_id, ...rest } = query;
  const response = await fetch.get(
    `${URL_API}/3/movie/${movie_id}/recommendations${queryToString(rest)}`,
    {
      next: { revalidate: 60 },
    },
  );
  return movieRecommendationsResponseSchema.parse(response);
};
export type IMovieRecommedationsFn = Awaited<ReturnType<typeof getMovieRecommedations>>;
export function useGetMovieRecommendations(
  query: MovieRecomendationsQuery,
  options?: UseQueryOptions<IMovieRecommedationsFn>,
) {
  return useQuery<IMovieRecommedationsFn>(
    MovieRecommendationsKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieRecommedations({ fetch, query });
    },
    options,
  );
}

export const getMovieReviews = async ({ fetch, query }: FetcherArgs<MovieReviewsQuery>) => {
  const { movie_id, ...rest } = query;
  const response = await fetch.get(`${URL_API}/3/movie/${movie_id}/reviews${queryToString(rest)}`, {
    next: { revalidate: 60 },
  });
  return movieReviewsResponseSchema.parse(response);
};
export type IMovieReviewsFn = Awaited<ReturnType<typeof getMovieReviews>>;
export function useGetMovieReviews(
  query: MovieReviewsQuery,
  options?: UseQueryOptions<IMovieReviewsFn>,
) {
  return useQuery<IMovieReviewsFn>(
    MovieReviewsKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieReviews({ fetch, query });
    },
    options,
  );
}

export const getMovieDiscover = async ({ fetch, query }: FetcherArgs<MovieDiscoverQuery>) => {
  const response = await fetch.get(`${URL_API}/3/discover/movie${queryToString(query)}`, {
    next: { revalidate: 60 },
  });
  return movieSearchResponseSchema.parse(response);
};
export type IMovieDiscoverFn = Awaited<ReturnType<typeof getMovieDiscover>>;

export type InfiniteMovieDiscoverFn = InfiniteData<IMovieDiscoverFn>;
export function useGetInfiniteMovieDiscover(
  query: MovieDiscoverQuery,
  options?: UseInfiniteQueryOptions<IMovieDiscoverFn>,
) {
  return useInfiniteQuery<IMovieDiscoverFn>(
    MovieDiscoverKeys.infiniteList(query),
    async ({ pageParam = query.page }) => {
      const fetch = fetchBrowser();
      return getMovieDiscover({
        fetch,
        query: { ...query, page: pageParam || "1" },
      });
    },
    {
      select: options?.select as unknown as (
        data: InfiniteMovieDiscoverFn,
      ) => InfiniteData<IMovieDiscoverFn>,
      getNextPageParam: lastPage => {
        if (lastPage.results.length < 20) {
          return undefined;
        }
        return lastPage.page + 1;
      },
      ...options,
    },
  );
}

export const getMovieVideos = async ({ fetch, query }: FetcherArgs<MovieReviewsQuery>) => {
  const { movie_id, ...rest } = query;
  const response = await fetch.get(`${URL_API}/3/movie/${movie_id}/videos${queryToString(rest)}`, {
    next: { revalidate: 60 },
  });
  return movieVideosResponseSchema.parse(response);
};
export type IMovieVideosFn = Awaited<ReturnType<typeof getMovieVideos>>;
export function useGetMovieVideos(
  query: MovieVideoQuery,
  options?: UseQueryOptions<IMovieVideosFn>,
) {
  return useQuery<IMovieVideosFn>(
    MovieVideoKeys.list(query),
    () => {
      const fetch = fetchBrowser();
      return getMovieVideos({ fetch, query });
    },
    options,
  );
}
