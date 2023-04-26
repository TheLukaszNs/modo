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
}
