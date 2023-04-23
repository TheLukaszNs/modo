import { SafeAreaView } from "react-native";
import { useAuth } from "../../context/auth";
import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

export const Header = () => {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        px="l"
      >
        <Text fontSize={24} fontWeight="700">
          modo
        </Text>

        <Text fontSize={16}>szukaj</Text>
      </Box>
    </SafeAreaView>
  );
};
