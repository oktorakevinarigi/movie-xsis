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

type IFetchNode = {
  token?: string;
};

function handleOptions(options?: IOptions & IFetchNode) {
  const { token, headers, body, others, ...rest } = options || {};
  return {
    ...((token || headers) && {
      headers: {
        ...(token && { authorization: `Bearer ${token}` }),
        ...headers,
      },
    }),
    ...(getBody && getBody({ body, others })),
    ...rest,
  };
}

export function fetchNode(arg?: IFetchNode) {
  async function get(url: string, options?: IOptions) {
    return await getFetch(url, handleOptions({ ...options, ...arg }));
  }

  async function post(url: string, options?: IOptions) {
    return await postFetch(url, handleOptions({ ...options, ...arg }));
  }

  async function put(url: string, options?: IOptions) {
    return await putFetch(url, handleOptions({ ...options, ...arg }));
  }

  async function _delete(url: string, options?: IOptions) {
    return await deleteFetch(url, handleOptions({ ...options, ...arg }));
  }

  async function patch(url: string, options?: IOptions) {
    return await patchFetch(url, handleOptions({ ...options, ...arg }));
  }

  return {
    get,
    post,
    put,
    delete: _delete,
    patch,
  };
}

export type IFetch = ReturnType<typeof fetchNode>;
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
