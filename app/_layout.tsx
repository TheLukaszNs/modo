import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../common/theme";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/auth";

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
          <StatusBar style="auto" />
        </>
      </ThemeProvider>
    </AuthProvider>
  );
}
