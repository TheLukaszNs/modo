import { createTheme } from "@shopify/restyle";

const palette = {
  lightBlue: "#E6FFFD",
  pastelGreen: "#B7F0B1",
  pastelYellow: "#FDF3BA",
  pastelRed: "#FF6F6F",
  pastelBlue: "#557AFF",
  pastelBeige: "#FFFAEF",

  black: "#000000",
  white: "#FFFFFF",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.pastelBeige,
    mainForeground: palette.black,

    ...palette,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },
  textVariants: {
    defaults: {
      fontSize: 14,
    },
    header: {
      fontWeight: "500",
      fontSize: 32,
    },
    cardHeader: {
      fontSize: 24,
      fontWeight: "900",
    },
    cardSubheader: {
      fontSize: 14,
      fontWeight: "700",
    },
  },
  buttonVariants: {
    regular: {
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 4,
    },
  },
});

export type Theme = typeof theme;
export default theme;
