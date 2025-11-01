import { extendTheme } from "@chakra-ui/react";
import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: {
    border: "2px solid",
    borderColor: "gray.300",
    borderRadius: "md",
    _checked: {
      bg: "blue.500",
      borderColor: "blue.500",
    },
  },
  indicator: {
    color: "white",
    fontSize: "md",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const config = {
  initialColorMode: "light", // ✅ fallback
  useSystemColorMode: true, // ✅ volgt OS dark/light voorkeur
};

export const theme = extendTheme({
  config,
  components: {
    Checkbox: defineMultiStyleConfig({ baseStyle }),
  },
});
