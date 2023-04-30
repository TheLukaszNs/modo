import { Tabs } from "expo-router";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../../common/theme";
import { Box } from "../../components/UI/Box";
import { NavProfileIcon } from "../../components/Icons";
import { NavListIcon } from "../../components/Icons";
import { NavHomeIcon } from "../../components/Icons";
import { SvgProps } from "react-native-svg";
import { SearchIcon } from "../../components/Icons";

export default function Layout() {
  const theme = useTheme<Theme>();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.pastelRed,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopColor: theme.colors.black,
          borderTopWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: theme.spacing.m,
        },
        tabBarIcon: ({ focused }) => {
          let Icon: React.FC<SvgProps> = () => null;

          switch (route.name) {
            case "list":
              Icon = NavListIcon;
              break;
            case "dashboard":
              Icon = NavHomeIcon;
              break;
            case "profile":
              Icon = NavProfileIcon;
              break;
            case "search":
              Icon = SearchIcon;
          }

          return (
            <Box alignItems="center" justifyContent="space-between">
              <Icon
                width={40}
                height={40}
                color={focused ? theme.colors.pastelGreen : "white"}
              />
              {focused && (
                <Box
                  height={6}
                  width={24}
                  backgroundColor="pastelGreen"
                  borderWidth={1}
                  borderColor="black"
                  borderRadius={4}
                />
              )}
            </Box>
          );
        },
      })}
    >
      <Tabs.Screen name="list" />
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
