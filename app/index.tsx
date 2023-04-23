import { createBox, createText, useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { ProgressBar } from "../components/ProgressBar";
import { MovieListItem } from "../components/MovieListItem";
import { StatsHeader } from "../components/StatsHeader";
import { Header } from "../components/Header";
import { ScrollView, useWindowDimensions } from "react-native";
import { BadgeFilter } from "../components/BadgeFilter";
import { useState } from "react";
import { LastSeen } from "../components/LastSeen";
import auth from "@react-native-firebase/auth";
import { Redirect, Tabs } from "expo-router";

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
  const { width } = useWindowDimensions();

  const theme = useTheme<Theme>();

  return <Redirect href="/(tabs)/dashboard" />;

  return (
    <Box flex={1} py="m" backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Box px="l" gap="m">
          <Header />

          <Box maxWidth="85%">
            <BadgeFilter
              items={FILTERS}
              getSelected={(item) => item.value === filter}
              labelExtractor={(item) => item.name}
              keyExtractor={(item) => item.value}
              onChange={(item) => setFilter(item.value)}
            />
          </Box>
        </Box>

        <LastSeen />

        <Box px="l" gap="s">
          <Text fontSize={24} fontWeight="900">
            statystyki
          </Text>

          <Box flexDirection="row" gap="s">
            <Box
              p="s"
              height={130}
              aspectRatio={1}
              backgroundColor="white"
              borderColor="black"
              borderWidth={1}
              borderRadius={4}
              justifyContent="space-between"
            >
              <Text fontSize={48} fontWeight="900">
                7
              </Text>
              <Text fontSize={16} fontWeight="900">
                pozycji{"\n"}na liście
              </Text>
            </Box>
            <Box
              py="s"
              pl="s"
              flex={1}
              backgroundColor="pastelYellow"
              borderColor="black"
              borderWidth={1}
              borderRadius={4}
              justifyContent="space-between"
            >
              <Text
                fontSize={32}
                fontWeight="900"
                numberOfLines={1}
                ellipsizeMode="clip"
              >
                Marvel: Avengers
              </Text>
              <Text fontSize={16} fontWeight="900">
                ostatnio oceniony
              </Text>
            </Box>
          </Box>

          <Box
            p="s"
            backgroundColor="pastelGreen"
            borderRadius={4}
            borderWidth={1}
            borderColor="black"
            height={130}
            justifyContent="space-between"
          >
            <Text fontSize={48} fontWeight="900">
              25
            </Text>

            <Text fontSize={16} fontWeight="900">
              obejrzanych filmów i seriali
            </Text>
          </Box>

          <Text
            onPress={() => {
              auth().signOut();
            }}
          >
            Wyloguj 🔓
          </Text>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
