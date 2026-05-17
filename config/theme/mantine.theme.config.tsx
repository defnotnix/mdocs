"use client";

import { createTheme } from "@mantine/core";

import { configThemeComponents } from "./mantine.components.config";

export const configMantineTheme: any = createTheme({
  colors: {
    brand: [
      "#e5f4ff",
      "#cde2ff",
      "#9bc2ff",
      "#64a0ff",
      "#3984fe",
      "#1d72fe",
      "#0969ff",
      "#0058e4",
      "#004ecc",
      "#0043b5",
    ],
  },
  primaryColor: "brand",
  primaryShade: {
    light: 6,
    dark: 2,
  },
  fontFamily: `"Manrope", sans-serif`,
  autoContrast: true,
  luminanceThreshold: 0.5,

  components: configThemeComponents,
});
