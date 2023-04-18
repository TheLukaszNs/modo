import { createTheme } from "@shopify/restyle";

const palette = {
  cream: "#F0F0C9",
  amber: "#F2BB05",
  indigo: "#124E78",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.cream,
    accent: palette.amber,

    textOnBackground: "black",
    textOnBlack: "white",
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
});

export type Theme = typeof theme;
export default theme;
