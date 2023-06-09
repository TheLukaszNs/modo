import { SafeAreaView } from "react-native";
import { useAuth } from "../../context/auth";
import { Text } from "../Typography";
import { Box } from "../UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";

type Props = {
  right?: React.ReactElement;
};

export const Header = ({ right }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

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

        {right ? (
          right
        ) : (
          <Text
            fontSize={16}
            onPress={() => {
              router.push("/search");
            }}
          >
            szukaj
          </Text>
        )}
      </Box>
    </SafeAreaView>
  );
};
