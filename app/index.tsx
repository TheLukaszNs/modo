import { createBox, createText, useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "../components/ProgressBar";
import { MovieListItem } from "../components/MovieListItem";
import { StatsHeader } from "../components/StatsHeader";
import { Header } from "../components/Header";
import { ScrollView } from "react-native";

const Box = createBox<Theme>();
const Text = createText<Theme>();

export default function Page() {
  const theme = useTheme<Theme>();

  return (
    <Box flex={1} py="m" backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Box px="l">
          <Header />

          <StatsHeader />

          <Text mt="l" fontSize={18} fontWeight="700">
            Ostatnio obejrzane
          </Text>
        </Box>

        <ScrollView
          horizontal
          style={{
            flexGrow: 0,
            marginTop: theme.spacing.s,
          }}
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.l,
            gap: theme.spacing.m,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <MovieListItem
            movie={{
              id: 0,
              image: "https://picsum.photos/200/300",
              title: "The Shawshank Redemption",
            }}
            tags={["Film", "Dramat", "Kryminał"]}
          />

          <MovieListItem
            movie={{
              id: 1,
              image: "https://picsum.photos/200/300",
              title: "The Godfather",
            }}
            tags={["Film", "Dramat", "Kryminał"]}
          />

          <MovieListItem
            movie={{
              id: 2,
              image: "https://picsum.photos/200/300",
              title: "Stranger Things",
            }}
            tags={["Serial", "Dramat", "Sci-Fi", "s3"]}
          />

          <MovieListItem
            movie={{
              id: 3,
              image: "https://picsum.photos/200/300",
              title: "The Godfather: Part II",
            }}
            tags={["Film", "Dramat", "Kryminał"]}
          />

          <MovieListItem
            movie={{
              id: 4,
              image: "https://picsum.photos/200/300",
              title: "The Dark Knight",
            }}
            tags={["Film", "Dramat", "Kryminał"]}
          />
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}
