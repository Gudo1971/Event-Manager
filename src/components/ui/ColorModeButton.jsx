// src/components/ui/ColorModeButton.jsx
import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";
import * as React from "react";

function ColorModeIcon() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === "dark" ? <LuMoon /> : <LuSun />;
}

export const ColorModeButton = React.forwardRef(function ColorModeButton(
  props,
  ref
) {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleColorMode = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!resolvedTheme) return null;

  return (
    <IconButton
      icon={<ColorModeIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      aria-label="Toggle color mode"
      size="sm"
      ref={ref}
      {...props}
    />
  );
});
