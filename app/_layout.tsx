import { ThemeProvider } from "@shopify/restyle";
import { Stack } from "expo-router";
import theme from "../common/theme";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={client}>
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
    </QueryClientProvider>
  );
}
