import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../common/theme";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
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
  );
}
