import { Pressable } from "react-native";
import { Header } from "../../components/Header";
import { Text } from "../../components/Typography";
import { Box } from "../../components/UI/Box";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";

export default function ProfilePage() {
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header />

      <Box alignItems="center" mt="m" px="l" gap="l">
        <Box
          width={80}
          height={80}
          backgroundColor="pastelGreen"
          borderRadius={80}
          borderWidth={1}
          borderColor="black"
        />

        <Text fontSize={32} fontWeight="900" textAlign="center">
          {auth().currentUser?.displayName ?? "?"}
        </Text>

        <Pressable
          onPress={async () => await auth().signOut()}
          style={{
            alignSelf: "stretch",
          }}
        >
          <Box
            p="m"
            backgroundColor="pastelRed"
            borderRadius={4}
            borderWidth={1}
            flexDirection="row"
            alignItems="center"
            gap="s"
          >
            <Icon name="logout" size={24} />
            <Text fontSize={18} fontWeight="700">
              wyloguj się
            </Text>
          </Box>
        </Pressable>
      </Box>
    </Box>
  );
}
