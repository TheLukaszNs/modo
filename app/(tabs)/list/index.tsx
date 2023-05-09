import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../../components/Typography";
import { Box } from "../../../components/UI/Box";
import { useUserMovies } from "../../../hooks/useUserMovies";
import { Header } from "../../../components/Header";
import { BadgeFilter } from "../../../components/BadgeFilter";
import { useState } from "react";
import { PastelCard } from "../../../components/PastelCard";
import { FlatList, Pressable } from "react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../../common/theme";
import { Rating } from "../../../components/Rating";
import { useRouter } from "expo-router";

const FILTERS = [
  {
    name: "obejrzane",
    value: "watched",
  },
  {
    name: "do obejrzenia",
    value: "list",
  },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function ListPage() {
  const [filter, setFilter] = useState<Filter>("watched");
  const allMovies = useUserMovies()?.list;

  const theme = useTheme<Theme>();
  const router = useRouter();

  const movies = allMovies?.filter((movie) => movie.status === filter);

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
            <Pressable
              onPress={() => {
                router.push({
                  pathname: `/list/[id]`,
                  params: {
                    id: item.id,
                    type: item.type,
                  },
                });
              }}
            >
              <PastelCard>
                <Text fontSize={24} fontWeight="900" mb="m">
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
              </PastelCard>
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Box>
    </Box>
  );
}
