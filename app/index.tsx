import { createBox, createText, useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "../components/ProgressBar";
import { MovieListItem } from "../components/MovieListItem";
import { StatsHeader } from "../components/StatsHeader";
import { Header } from "../components/Header";
import { ScrollView } from "react-native";
import { BadgeFilter } from "../components/BadgeFilter";
import { useState } from "react";

const Box = createBox<Theme>();
const Text = createText<Theme>();

const FILTERS = [
  { name: "ostatnio obejrzane", value: "lastWatched" },
  { name: "nowości", value: "new" },
  { name: "polecane", value: "popular" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function Page() {
  const [filter, setFilter] = useState<Filter>("lastWatched");
  const theme = useTheme<Theme>();

  return (
    <Box flex={1} py="m" backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Box px="l" gap="m">
          <Header />

          <BadgeFilter
            items={FILTERS}
            getSelected={(item) => item.value === filter}
            labelExtractor={(item) => item.name}
            keyExtractor={(item) => item.value}
            onChange={(item) => setFilter(item.value)}
          />
        </Box>
      </SafeAreaView>
    </Box>
  );
}
