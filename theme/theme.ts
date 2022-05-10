import { extendTheme, withDefaultSize } from "@chakra-ui/react";

import Button from "./Button.theme";

const theme = extendTheme(
  {
    components: { Button: Button },
    styles: {
      global: () => ({
        body: {
          fontFamily: "body",
          fontSize: "18px",
          color: "rgb(190, 184, 176)",
          bg: "#18191a",
          lineHeight: "base",
        },
      }),
    },
    colors: {
      "pastel-pink": "#f3b0c3",
      "pastel-green": "#7fffd4",
      "pastel-yellow": "#fdfd97",
      "pastel-blue": "#89cff0",
      "pastel-red": "#ff6962",
      "pastel-orange": "#ffa161",
      "pastel-purple": "#e2a7d9",
      "pastel-black": "#292929",
    },
  },
  withDefaultSize({
    size: "xl",
    components: ["Spinner"],
  }),
);

export default theme;
