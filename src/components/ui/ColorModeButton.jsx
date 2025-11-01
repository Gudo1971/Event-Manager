// src/components/ui/ColorModeButton.jsx
import { IconButton, useColorMode } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import * as React from "react";

function ColorModeIcon({ mode }) {
  return mode === "dark" ? <LuMoon /> : <LuSun />;
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref
) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={<ColorModeIcon mode={colorMode} />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
    />
  );
});
