// src/components/ui/provider.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";

export function Provider({ children }) {
  return (
    <ColorModeProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </ColorModeProvider>
  );
}
