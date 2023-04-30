import { useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Text } from "../../components/Typography";
import { Box } from "../../components/UI/Box";
import { MoviesAPI } from "../../common/api";
import { memo, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { MultiSearchResponse } from "../../@types/api_responses";
import { FlatList, Pressable } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../common/theme";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useUserMovies } from "../../hooks/useUserMovies";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query);

  const moviesDoc = useRef(
    firestore().collection("movies").doc(auth().currentUser?.uid),
  ).current;

  const moviesQuery = useQuery({
    queryKey: ["movies", "query", debouncedQuery],
    queryFn: () =>
      MoviesAPI.search({ query: debouncedQuery, language: "pl-PL" }),
  });

  const loading = query !== debouncedQuery || moviesQuery.isLoading;

  const handleItemPress = async (
    item: MultiSearchResponse["results"][number],
  ) => {
    await moviesDoc.update({
      watched: firestore.FieldValue.arrayUnion({
        id: item.id,
        title: item.media_type === "movie" ? item.title : item.name,
        rating: 5,
      }),
    });
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header />

      <Box mt="m" px="l" gap="l" flex={1}>
        <Input
          placeholder="szukaj filmów i seriali..."
          onChangeText={(text) => setQuery(text)}
        />

        {loading ? (
          <Text>Ładowanie...</Text>
        ) : (
          <MovieList
            movies={moviesQuery.data?.results || []}
            onPress={handleItemPress}
          />
        )}
      </Box>
    </Box>
  );
}

const MovieList = ({
  movies,
  onPress,
}: {
  movies: MultiSearchResponse["results"];
  onPress?: (item: MultiSearchResponse["results"][number]) => void;
}) => {
  const userMovies = useUserMovies()?.watched;
  const theme = useTheme<Theme>();

  const filteredMovies = movies.filter(
    (movie) => movie.media_type === "movie" || movie.media_type === "tv",
  );

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        gap: theme.spacing.m,
        paddingBottom: theme.spacing.m,
      }}
      showsVerticalScrollIndicator={false}
      data={filteredMovies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const isOnList = userMovies?.some((movie) => movie.id === item.id);

        return (
          <SearchItem
            isOnList={isOnList}
            onPress={() => onPress?.(item)}
            item={item}
          />
        );
      }}
    />
  );
};

const SearchItem = memo(
  ({
    isOnList,
    onPress,
    item,
  }: {
    isOnList?: boolean;
    onPress?: () => void;
    item: MultiSearchResponse["results"][number];
  }) => {
    return (
      <Pressable disabled={isOnList} onPress={onPress}>
        <Box
          backgroundColor="white"
          p="m"
          borderColor="black"
          borderWidth={1}
          borderRadius={4}
          gap="s"
          opacity={isOnList ? 0.3 : 1}
        >
          <Text fontSize={24} fontWeight="900">
            {item.media_type === "movie" ? item.title : item.name}
          </Text>
          <Text fontSize={14} fontWeight="700">
            {item.media_type === "movie"
              ? `Premiera: ${item.release_date || "?"}`
              : `Premiera: ${item.first_air_date || "?"}`}
          </Text>

          <Text fontSize={14} fontWeight="500" numberOfLines={3}>
            {item.overview}
          </Text>
        </Box>
      </Pressable>
    );
  },
);