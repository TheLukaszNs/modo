import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Pressable, View, useWindowDimensions } from "react-native";
import { Box } from "../../components/UI/Box";
import { Text } from "../../components/Typography";
import { Input } from "../../components/Input";
import { BackIcon } from "../../components/Icons/Back";
import { Button } from "../../components/Button";
import { useRouter } from "expo-router";
import { useState } from "react";
import auth from "@react-native-firebase/auth";

const REGISTER_IMAGE = require("../../assets/update.png");

export default function Page() {
  const { height, width } = useWindowDimensions();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const validate = () => {
    if (form.password !== form.passwordConfirmation) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const credentials = await auth().createUserWithEmailAndPassword(
      form.email,
      form.password,
    );

    await credentials.user.updateProfile({
      displayName: form.name,
    });

    await credentials.user.reload();
  };

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
            width: width * 0.7,
            height: undefined,
            aspectRatio: 1,
          }}
        />

        <Text textAlign="center" fontSize={40} fontWeight="800">
          dołącz do nas
        </Text>

        <Box px="l" gap="m" justifyContent="flex-end" flex={1}>
          <Input
            placeholder="joe@example.com"
            suffixIcon="account"
            defaultValue={form.email}
            onChangeText={(value) => {
              handleChange("email", value);
            }}
          />
          <Input
            placeholder="imię"
            suffixIcon="account-box-outline"
            defaultValue={form.name}
            onChangeText={(value) => {
              handleChange("name", value);
            }}
          />
          <Input
            placeholder="hasło"
            secureTextEntry
            suffixIcon="form-textbox-password"
            defaultValue={form.password}
            onChangeText={(value) => {
              handleChange("password", value);
            }}
          />
          <Input
            placeholder="powtórz hasło"
            secureTextEntry
            suffixIcon="repeat"
            defaultValue={form.passwordConfirmation}
            onChangeText={(value) => {
              handleChange("passwordConfirmation", value);
            }}
          />
          <Button variant="elevated" onPress={handleSubmit}>
            załóż konto
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
