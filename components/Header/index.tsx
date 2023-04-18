import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export const Header = () => {
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
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
  );
};
