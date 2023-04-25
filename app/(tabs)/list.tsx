import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Typography";
import { Box } from "../../components/UI/Box";
import { useUserMovies } from "../../hooks/useUserMovies";
import { Header } from "../../components/Header";
import { BadgeFilter } from "../../components/BadgeFilter";
import { useState } from "react";
import { PastelCard } from "../../components/PastelCard";

const FILTERS = [
  {
    name: "obejrzane",
    value: "watched",
  },
  {
    name: "do obejrzenia",
    value: "toWatch",
  },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function ListPage() {
  const [filter, setFilter] = useState<Filter>("watched");
  const allMovies = useUserMovies();

  const movies = filter === "watched" ? allMovies?.watched : allMovies?.list;

  return (
    <Box flex={1} backgroundColor="pastelBeige">
      <Header />

      <Box px="l" mt="m" gap="m">
        <BadgeFilter
          items={FILTERS}
          getSelected={(item) => item.value === filter}
          keyExtractor={(item) => item.value}
          labelExtractor={(item) => item.name}
          onChange={(item) => setFilter(item.value)}
        />

        {movies?.map((movie, index) => (
          <PastelCard key={movie.id ?? index}>
            <Text fontSize={24} fontWeight="900">
              {movie.title}
            </Text>
            <Text mt="m" fontSize={24} fontWeight="900">
              <Text color="pastelRed" fontSize={24} fontWeight="900">
                {movie.rating}
              </Text>
              /5
            </Text>
          </PastelCard>
        ))}
      </Box>
    </Box>
  );
}
