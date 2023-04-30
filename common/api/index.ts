import Constants from "expo-constants";
import ky from "ky";
import { z } from "zod";
import { MultiSearchResponse } from "../../@types/api_responses";

const BASE_URL = "https://api.themoviedb.org/3/";

const createFetchWithKey = <T extends z.AnyZodObject, Params = z.infer<T>>(
  endpoint: string,
  input?: T,
) => {
  const url = `${BASE_URL}${endpoint}`;

  return async (params: Params) => {
    return ky
      .get(url, {
        searchParams: {
          api_key: Constants.expoConfig?.extra?.apiKey,
          ...params,
        },
      })
      .then((data) => data.json<MultiSearchResponse>());
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
};
