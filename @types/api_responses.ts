export type MultiSearchResponse = {
  results: ({
    adult: boolean;
    backdrop_path: string;
    poster_path: string;
    id: number;
    overview: string;
    media_type: "movie" | "tv" | "person";
  } & (
    | {
        media_type: "movie";
        title: string;
        release_date: string;
      }
    | {
        media_type: "tv";
        name: string;
        first_air_date: string;
      }
  ))[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type MovieDetailsResponse = {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
};

export type ShowDetailsResponse = {
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
};
