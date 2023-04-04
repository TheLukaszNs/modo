import { createBox, createText, useTheme } from "@shopify/restyle";
import { Theme } from "../common/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const Box = createBox<Theme>();
const Text = createText<Theme>();

export default function Page() {
  const theme = useTheme<Theme>();

  return (
    <Box flex={1} py="m" px="l" backgroundColor="mainBackground">
      <SafeAreaView>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text variant="header" color="textOnBackground">
            Hej,{"\n"}
            <Text variant="header" fontWeight="900">
              Łukasz
            </Text>
            !
          </Text>

          <Box flexDirection="row" alignItems="center" gap="m">
            <Box
              backgroundColor="accent"
              borderColor="accent"
              width={48}
              height={48}
              borderRadius={32}
              justifyContent="center"
              alignItems="center"
            >
              <Icon name="account" color="black" size={24} />
            </Box>

            <Icon name="dots-vertical" size={24} />
          </Box>
        </Box>

        <Box backgroundColor="accent" px="m" py="l" mt="m" borderRadius={16}>
          <Text variant="cardHeader">Twoje filmy</Text>
          <Text variant="cardSubheader" mt="l">
            Obejrzałeś 7 tytułów 🎬
          </Text>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
