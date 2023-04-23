import { useAuth } from "../../context/auth";
import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

export const Header = () => {
  const { user } = useAuth();

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text fontSize={24} fontWeight="700">
        modo
      </Text>

      <Text fontSize={16}>szukaj</Text>
    </Box>
  );
};
