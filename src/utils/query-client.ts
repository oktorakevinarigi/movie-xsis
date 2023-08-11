import { cache } from "react";
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { z } from "zod";

import { SwalError } from "./sweetalert";

export const queryClientOptions = {
  defaultOptions: { queries: { retry: false } },
  queryCache: new QueryCache({
    onError: error => {
      let message;
      if (error instanceof z.ZodError) {
        const zodError = error.errors;
        const msg = zodError
          .map(err => `${err.path.map(key => key).join(".")} expected: ${err.message}`)
          .join(" >>");
        message = ">>" + msg;
      }
      SwalError({ text: message });
    },
  }),
  mutationCache: new MutationCache({
    onError: () => {
      SwalError();
    },
  }),
};

export const getQueryClient = cache(() => new QueryClient(queryClientOptions));
