import { useSearchParams } from "expo-router";
import { Header } from "../../../components/Header";
import { Text } from "../../../components/Typography";
import { Box } from "../../../components/UI/Box";
import { Movie } from "../../../@types/movie";
import { useQuery } from "@tanstack/react-query";
import { MoviesAPI } from "../../../common/api";
import { Image } from "expo-image";
import {
  MovieDetailsResponse,
  ShowDetailsResponse,
} from "../../../@types/api_responses";
import { ScrollView } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../common/theme";

type DetailsSearchParams = {
  id: string;
  type: Movie["type"];
};

export default function DetailsPage() {
  const theme = useTheme<Theme>();

  const params = useSearchParams() as DetailsSearchParams;

  const movieDetailsQuery = useQuery({
    queryKey: [
      "movies",
      "details",
      {
        id: params.id,
        type: params.type,
      },
    ],
    queryFn: () => {
      if (params.type === "movie") {
        return MoviesAPI.getMovieById({
          id: params.id,
          language: "pl-PL",
        }) as Promise<MovieDetailsResponse>;
      }
    },
    enabled: params.type === "movie",
  });

  const tvDetailsQuery = useQuery({
    queryKey: [
      "movies",
      "details",
      {
        id: params.id,
        type: params.type,
      },
    ],
    queryFn: () => {
      if (params.type === "tv") {
        return MoviesAPI.getShowById({
          id: params.id,
          language: "pl-PL",
        }) as Promise<ShowDetailsResponse>;
      }
    },
    enabled: params.type === "tv",
  });

  if (movieDetailsQuery.isLoading || tvDetailsQuery.isLoading) {
    return (
      <Box flex={1} backgroundColor="pastelBeige">
        <Header />
        <Text>Loading...</Text>
      </Box>
    );
  }

  const movie = movieDetailsQuery?.data;
  const tv = tvDetailsQuery?.data;

  return (
    <Box flex={1} backgroundColor="pastelBeige" gap="m">
      <Header />
      <Box px="l" gap="m" flex={1}>
        {params.type === "movie" ? (
          <>
            <Box overflow="hidden" borderRadius={8}>
              <Image
                source={`https://www.themoviedb.org/t/p/w1280/${movie?.backdrop_path}`}
                style={{
                  width: "100%",
                  height: 240,
                }}
                contentFit="cover"
                transition={1000}
              />
            </Box>
            <Text variant="header" fontWeight="900">
              {movie?.title}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: theme.spacing.m,
              }}
            >
              <Text fontWeight="500" fontSize={18}>
                {movie?.overview}
              </Text>
            </ScrollView>
          </>
        ) : (
          <>
            <Box
              overflow="hidden"
              borderRadius={8}
              borderWidth={2}
              borderColor="black"
            >
              <Image
                source={`https://www.themoviedb.org/t/p/w1280/${tv?.backdrop_path}`}
                style={{
                  width: "100%",
                  height: 240,
                }}
                contentFit="cover"
                transition={1000}
              />
            </Box>
            <Text variant="header" fontWeight="900">
              {tv?.name}
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                flex: 1,
              }}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: theme.spacing.m,
              }}
            >
              <Text fontWeight="500" fontSize={18}>
                {tv?.overview}
              </Text>
            </ScrollView>
          </>
        )}
      </Box>
    </Box>
  );
}
