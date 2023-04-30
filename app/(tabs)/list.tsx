import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Typography";
import { Box } from "../../components/UI/Box";
import { useUserMovies } from "../../hooks/useUserMovies";
import { Header } from "../../components/Header";
import { BadgeFilter } from "../../components/BadgeFilter";
import { useState } from "react";
import { PastelCard } from "../../components/PastelCard";
import { FlatList } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../common/theme";
import { Rating } from "../../components/Rating";

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

  const theme = useTheme<Theme>();

  const movies = filter === "watched" ? allMovies?.watched : allMovies?.list;

  return (
    <Box flex={1} backgroundColor="pastelBeige">
      <Header />

      <Box px="l" mt="m" gap="m" flex={1}>
        <BadgeFilter
          items={FILTERS}
          getSelected={(item) => item.value === filter}
          keyExtractor={(item) => item.value}
          labelExtractor={(item) => item.name}
          onChange={(item) => setFilter(item.value)}
        />

        <FlatList
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flexGrow: 1,
            gap: theme.spacing.m,
            paddingBottom: theme.spacing.m,
          }}
          data={movies}
          renderItem={({ item }) => (
            <PastelCard>
              <Text fontSize={24} fontWeight="900" mb="m">
                {item.title}
              </Text>
              <Rating rating={item.rating} />
            </PastelCard>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
}
