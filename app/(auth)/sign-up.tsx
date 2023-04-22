import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { Box } from "../../components/UI/Box";
import { Text } from "../../components/Typography";
import { Input } from "../../components/Input";
import { BackIcon } from "../../components/Icons/Back";

export default function Page() {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <BackIcon />
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          modo
        </Text>
      </SafeAreaView>
    </Box>
  );
}
