// src/components/ui/color-mode.jsx
import { ThemeProvider } from "next-themes";

export function ColorModeProvider({ children }) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
