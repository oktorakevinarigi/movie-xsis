import { dehydrate, Hydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils/query-client";
import { fetchNode } from "@/utils";
import {
  getMovieDetail,
  MovieKeys,
  getMovieRecommedations,
  MovieRecommendationsKeys,
  MovieGenresKeys,
  getMovieGenres,
  MovieReviewsKeys,
  getMovieReviews,
} from "@/components/feature";
import { DetailPage } from "@/components/pages";
import { API_KEY } from "@/constants";

export default async function Detail({ params }: { params: { id: string } }) {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const queryDetail = {
    api_key: API_KEY,
    movie_id: params.id,
    language: "en-US",
    append_to_response: "",
  };
  const queryRecommendations = {
    api_key: API_KEY,
    movie_id: params.id,
  };
  const queryGenre = { api_key: API_KEY, language: "en" };
  const queryReviews = {
    api_key: API_KEY,
    movie_id: params.id,
  };

  await Promise.all([
    queryClient.prefetchQuery(MovieKeys.detail(queryDetail), () =>
      getMovieDetail({ fetch, query: queryDetail }),
    ),
    queryClient.prefetchQuery(MovieRecommendationsKeys.list(queryRecommendations), () =>
      getMovieRecommedations({ fetch, query: queryRecommendations }),
    ),
    queryClient.prefetchQuery(MovieGenresKeys.list(queryGenre), () =>
      getMovieGenres({ query: queryGenre, fetch }),
    ),
    queryClient.prefetchQuery(MovieReviewsKeys.list(queryReviews), () =>
      getMovieReviews({ query: queryReviews, fetch }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <DetailPage id={params.id} />
    </Hydrate>
  );
}
