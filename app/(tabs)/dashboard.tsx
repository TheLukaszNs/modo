import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../../components/UI/Box";
import { Header } from "../../components/Header";
import { BadgeFilter } from "../../components/BadgeFilter";
import { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import { Theme } from "../../common/theme";
import { useTheme } from "@shopify/restyle";
import { Text } from "../../components/Typography";
import { LastSeen } from "../../components/LastSeen";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

const FILTERS = [
  { name: "ostatnio obejrzane", value: "lastWatched" },
  { name: "nowości", value: "new" },
  { name: "polecane", value: "popular" },
] as const;

type Filter = (typeof FILTERS)[number]["value"];

export default function DashobardPage() {
  const [filter, setFilter] = useState<Filter>("lastWatched");
  const { width } = useWindowDimensions();
  const router = useRouter();

  const theme = useTheme<Theme>();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header />

      <Box my="s" />

      <ScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Box px="l" gap="m">
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

        {filter === "lastWatched" && (
          <LastSeen onSeeAllPress={() => router.push("/list")} />
        )}

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
        </Box>
      </ScrollView>
    </Box>
  );
}
