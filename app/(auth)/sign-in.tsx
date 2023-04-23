import {
  Image,
  ImageBackground,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../components/Typography";
import { Box } from "../../components/UI/Box";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import { Input } from "../../components/Input";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { Link, Stack } from "expo-router";
import { Button } from "../../components/Button";

const LOGIN_IMAGE = require("../../assets/welcome.png");

export default function Page() {
  const { height, width } = useWindowDimensions();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    const credentials = await auth().signInWithEmailAndPassword(
      form.email,
      form.password,
    );
  };

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <SafeAreaView style={{ flex: 1 }}>
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          modo
        </Text>

        <Image
          source={LOGIN_IMAGE}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: width * 0.8,
            height: undefined,
            aspectRatio: 1,
          }}
        />

        <Text textAlign="center" fontSize={40} fontWeight="800">
          witaj ponownie
        </Text>

        <Box px="l" gap="m" justifyContent="flex-end" flex={1}>
          <Input
            placeholder="joe@example.com"
            defaultValue={form.email}
            onChangeText={(value) => handleChange("email", value)}
            suffixIcon="account"
          />
          <Input
            placeholder="hasło"
            secureTextEntry
            defaultValue={form.password}
            onChangeText={(value) => handleChange("password", value)}
            suffixIcon="form-textbox-password"
          />
          <Button onPress={handleSubmit} variant="elevated">
            zaloguj
          </Button>
          <Text textAlign="center" fontSize={16}>
            Nie masz konta?{" "}
            <Link href="/(auth)/sign-up" asChild>
              <Text
                textDecorationLine="underline"
                color="pastelBlue"
                fontSize={16}
                fontWeight="700"
              >
                zarejestruj się
              </Text>
            </Link>
          </Text>
        </Box>
      </SafeAreaView>
    </Box>
  );
}
