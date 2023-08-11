export type ISource = "browser" | "server";
export type IOthers = (
  | {
      responseType?: "json";
    }
  | {
      responseType: "binary";
      fileName: string;
    }
  | {
      responseType: "blob";
      blobConfig?: BlobPropertyBag;
    }
) & {
  requestType?: "json" | "formData";
  tokenName?: string;
};
export type IOptions = { others?: IOthers } & RequestInit;

const DEFAULT_HEADERS = { Accept: "application/json", "Content-Type": "application/json" };

export function getBody(options?: IOptions) {
  if (options && options.body) {
    if (options.others && options.others.requestType === "json") {
      return { body: JSON.stringify(options.body) };
    } else {
      return { body: options.body };
    }
  }
}
function getDefaultHeaders({ requestType }: Pick<IOthers, "requestType">) {
  if (requestType === "json") {
    return DEFAULT_HEADERS;
  }
}
function getHeaders({ others, headers }: IOptions) {
  return {
    ...getDefaultHeaders({ requestType: others?.requestType || "json" }),
    ...headers,
  };
}

function verifyResponse(res: Response, result?: Record<string, unknown>) {
  if (!res.ok) {
    if (res.status === 404) {
      throw { statusCode: 404, message: result?.message || "Unauthorized", ...result };
    } else {
      throw result
        ? { statusCode: res.status, ...result }
        : { statusCode: res.status, message: "Network response was not ok" };
    }
  }
}
async function handleResponse(res: Response, others?: IOthers) {
  if (others && others.responseType === "json") {
    const result = (await res.json()) as Record<string, unknown>;
    verifyResponse(res, result);
    return result;
  } else if (others && others.responseType === "blob") {
    const result = await res.blob();
    verifyResponse(res);
    const createBlob = new Blob([result], others.blobConfig);
    return URL.createObjectURL(createBlob);
  } else if (others && others.responseType === "binary") {
    return await res.blob();
  }
}

function handleOptions(options?: IOptions) {
  const { headers, others, ...rest } = (options as IOptions) || {};
  return {
    ...getBody(options),
    headers: getHeaders({ headers, others }),
    ...rest,
  };
}

export async function getFetch(url: string, options?: IOptions) {
  const response = await fetch(url, {
    method: "GET",
    ...handleOptions(options),
  });
  return await handleResponse(response, options?.others || { responseType: "json" });
}

export async function postFetch(url: string, options?: IOptions) {
  const response = await fetch(url, {
    method: "POST",
    ...handleOptions(options),
  });
  return await handleResponse(response, options?.others || { responseType: "json" });
}

export async function putFetch(url: string, options?: IOptions) {
  const response = await fetch(url, {
    method: "PUT",
    ...handleOptions(options),
  });
  return await handleResponse(response, options?.others || { responseType: "json" });
}

export async function deleteFetch(url: string, options?: IOptions) {
  const response = await fetch(url, {
    method: "DELETE",
    ...handleOptions(options),
  });
  return await handleResponse(response, options?.others || { responseType: "json" });
}

export async function patchFetch(url: string, options?: IOptions) {
  const response = await fetch(url, {
    method: "PATCH",
    ...handleOptions(options),
  });
  return await handleResponse(response, options?.others || { responseType: "json" });
}

export type IQuery = Record<string, string | string[] | number | boolean | null | undefined>;

export function cleanQuery(query: IQuery) {
  return Object.keys(query).reduce(
    (cleanedQuery, queryKey) =>
      query[queryKey] ? { ...cleanedQuery, [queryKey]: query[queryKey] } : { ...cleanedQuery },
    {} as IQuery,
  );
}
export function queryToString(query: IQuery) {
  return (
    "?" +
    Object.keys(query)
      .map(queryKey => (query[queryKey] ? `${queryKey}=${query[queryKey]}` : null))
      .filter(Boolean)
      .join("&")
  );
}
