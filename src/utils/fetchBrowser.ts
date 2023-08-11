import {
  getFetch,
  postFetch,
  putFetch,
  deleteFetch,
  patchFetch,
  IOptions,
  IQuery,
  getBody,
} from "./fetch";

function getAuthorization(tokenName: string) {
  const result = null;
  if (result && result[tokenName]) {
    return { authorization: `Bearer ${result[tokenName]}` };
  }
}

function handleOptions(options?: IOptions) {
  const { headers, body, others, ...rest } = (options as IOptions) || {};
  return {
    ...((getAuthorization(others?.tokenName || "token") || headers) && {
      headers: {
        ...getAuthorization(others?.tokenName || "token"),
        ...headers,
      },
    }),
    ...(getBody && getBody({ body, others })),
    ...rest,
  };
}

export function fetchBrowser() {
  async function get(url: string, options?: IOptions) {
    return await getFetch(url, handleOptions(options));
  }

  async function post(url: string, options?: IOptions) {
    return await postFetch(url, handleOptions(options));
  }

  async function put(url: string, options?: IOptions) {
    return await putFetch(url, handleOptions(options));
  }

  async function _delete(url: string, options?: IOptions) {
    return await deleteFetch(url, handleOptions(options));
  }

  async function patch(url: string, options?: IOptions) {
    return await patchFetch(url, handleOptions(options));
  }

  return {
    get,
    post,
    put,
    delete: _delete,
    patch,
  };
}

export type IFetch = ReturnType<typeof fetchBrowser>;
export interface FetcherArgs<LocalQuery extends IQuery = IQuery> {
  fetch: IFetch;
  query: LocalQuery;
}
export interface OptionalFetcherArgs<LocalQuery extends IQuery = IQuery> {
  fetch: IFetch;
  query?: LocalQuery;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AwaitedReturn<T extends (...args: any) => Promise<any>> = Awaited<ReturnType<T>>;
