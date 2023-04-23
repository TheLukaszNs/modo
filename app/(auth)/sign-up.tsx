import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Pressable, View, useWindowDimensions } from "react-native";
import { Box } from "../../components/UI/Box";
import { Text } from "../../components/Typography";
import { Input } from "../../components/Input";
import { BackIcon } from "../../components/Icons/Back";
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";

const REGISTER_IMAGE = require("../../assets/update.png");

export default function Page() {
  const { height, width } = useWindowDimensions();
  const router = useRouter();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Box flexDirection="row" alignItems="center" px="l" gap="m">
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <BackIcon width={52} />
          </Pressable>
          <Text fontSize={24} fontWeight="bold" textAlign="center">
            modo
          </Text>
        </Box>
        <Image
          source={REGISTER_IMAGE}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: width * 0.8,
            height: undefined,
            aspectRatio: 1,
          }}
        />

        <Text textAlign="center" fontSize={40} fontWeight="800">
          dołącz do nas
        </Text>

        <Box px="l" gap="m" justifyContent="flex-end" flex={1}>
          <Input placeholder="joe@example.com" suffixIcon="account" />
          <Input
            placeholder="hasło"
            secureTextEntry
            suffixIcon="form-textbox-password"
          />
          <Input
            placeholder="powtórz hasło"
            secureTextEntry
            suffixIcon="repeat"
          />
          <Button variant="elevated">załóż konto</Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
