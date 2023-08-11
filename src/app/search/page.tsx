import { dehydrate, Hydrate } from "@tanstack/react-query";

import { getQueryClient } from "@/utils/query-client";
import { fetchNode } from "@/utils";
import { MovieKeys, getMovieSearch } from "@/components/feature";
import { SearchPage } from "@/components/pages";
import { API_KEY } from "@/constants";

type MoviesProps = {
  searchParams: { q: string };
};

export default async function Movies(props: MoviesProps) {
  const fetch = fetchNode();
  const queryClient = getQueryClient();

  const query = {
    api_key: API_KEY,
    query: props.searchParams.q || "",
    include_adult: false,
    language: "en-US",
    primary_release_year: "",
    page: "1",
    region: "",
    year: "",
  };

  await Promise.all([
    queryClient.fetchInfiniteQuery(
      MovieKeys.infiniteList(query),
      async () =>
        await getMovieSearch({
          fetch,
          query,
        }),
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <SearchPage />
    </Hydrate>
  );
}
