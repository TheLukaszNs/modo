import Constants from "expo-constants";
import ky from "ky";
import { z } from "zod";
import {
  MovieDetailsResponse,
  MultiSearchResponse,
} from "../../@types/api_responses";

const BASE_URL = "https://api.themoviedb.org/3/";

const createFetchWithKey = <
  K extends z.AnyZodObject,
  Params extends {} = z.infer<K>,
>(
  endpoint: string,
  input?: K,
) => {
  const url = `${BASE_URL}${endpoint}`;

  return async (params: Params) => {
    try {
      const parsedParams = input?.parse(params);
      let newUrl = url;

      // Replace all the params in the url (e.g. /movie/:id to /movie/123)
      Object.entries(parsedParams ?? {}).forEach(([key, value]) => {
        const paramsRegex = new RegExp(`:${key}`, "g");

        // Replace the param in the url if it exists
        if (newUrl.match(paramsRegex)) {
          newUrl = newUrl.replace(paramsRegex, value);

          // Remove the param from the object
          delete parsedParams?.[key];
        }
      });

      return ky
        .get(newUrl, {
          searchParams: {
            api_key: Constants.expoConfig?.extra?.apiKey,
            ...parsedParams,
          },
        })
        .then((data) => data.json<unknown>());
    } catch (error) {
      console.error(error);
    }
  };
};

export const MoviesAPI = {
  search: createFetchWithKey(
    "search/multi",
    z.object({
      query: z.string(),
      language: z.string().optional(),
    }),
  ),
  getMovieById: createFetchWithKey(
    "movie/:id",
    z.object({
      id: z.string(),
      language: z.string().optional(),
    }),
  ),
  getShowById: createFetchWithKey(
    "tv/:id",
    z.object({
      id: z.string(),
      language: z.string().optional(),
    }),
  ),
};
