import { z } from "zod";

export const movieResponseSchema = z.object({
  page: z.number(),
  results: z
    .object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      genre_ids: z.number().array(),
      id: z.number(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number(),
      poster_path: z.string().nullable(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
    .array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieDetailResponseSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().nullable(),
      backdrop_path: z.string().nullable(),
    })
    .nullable(),
  budget: z.number(),
  genres: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .array(),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  production_companies: z
    .object({
      id: z.number(),
      logo_path: z.string().nullable(),
      name: z.string(),
      origin_country: z.string(),
    })
    .array(),
  production_countries: z
    .object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
    .array(),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z
    .object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
    .array(),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const movieSearchResponseSchema = z.object({
  page: z.number(),
  results: z
    .object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      genre_ids: z.number().array(),
      id: z.number(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      popularity: z.number(),
      poster_path: z.string().nullable(),
      release_date: z.string(),
      title: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
    .array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieGenresResponseSchema = z.object({
  genres: z.object({ id: z.number(), name: z.string() }).array(),
});

export const movieRecommendationsResponseSchema = z.object({
  page: z.number(),
  results: z
    .object({
      adult: z.boolean(),
      backdrop_path: z.string().nullable(),
      id: z.number(),
      title: z.string(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      poster_path: z.string().nullable(),
      media_type: z.enum(["movie"]),
      genre_ids: z.number().array(),
      popularity: z.number(),
      release_date: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
    .array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieReviewsResponseSchema = z.object({
  id: z.number(),
  page: z.number(),
  results: z
    .object({
      author: z.string(),
      author_details: z.object({
        name: z.string(),
        username: z.string(),
        avatar_path: z.string().nullable(),
        rating: z.number().nullable(),
      }),
      content: z.string(),
      created_at: z.string(),
      id: z.string(),
      updated_at: z.string(),
      url: z.string(),
    })
    .array(),
  total_pages: z.number(),
  total_results: z.number(),
});

export const movieVideosResponseSchema = z.object({
  id: z.number(),
  results: z
    .object({
      iso_639_1: z.enum(["en"]),
      iso_3166_1: z.enum(["US"]),
      name: z.string(),
      key: z.string(),
      site: z.enum(["YouTube"]),
      size: z.number(),
      type: z.enum(["Behind the Scenes", "Clip", "Featurette", "Teaser", "Trailer"]),
      official: z.boolean(),
      published_at: z.string(),
      id: z.string(),
    })
    .array(),
});
