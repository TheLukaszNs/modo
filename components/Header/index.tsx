import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

export const Header = () => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Text variant="header">
        Hej,{"\n"}
        <Text variant="header" fontWeight="900">
          Łukasz
        </Text>
        !
      </Text>

      <Box flexDirection="row" alignItems="center" gap="m">
        <Box
          width={48}
          height={48}
          borderRadius={32}
          justifyContent="center"
          alignItems="center"
        >
          <Icon name="account" color="black" size={24} />
        </Box>

        <Icon
          name="logout"
          size={24}
          onPress={async () => {
            await auth().signOut();
          }}
        />
      </Box>
    </Box>
  );
};
