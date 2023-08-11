"use client";
import React, { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
  type HydrateProps,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { queryClientOptions } from "./query-client";

type ProvidersProps = { children: ReactNode };

export function Providers(props: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export const ReactQueryHydrate = (props: HydrateProps) => {
  return <Hydrate {...props} />;
};
