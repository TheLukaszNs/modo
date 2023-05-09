export type Movie = {
  id: number;
  title: string;
  rating: number;
  type: "movie" | "tv";
  status: "list" | "watched";
};
