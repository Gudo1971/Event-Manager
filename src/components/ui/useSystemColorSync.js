import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

export const useSystemColorSync = () => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const sync = () => {
      const mode = media.matches ? "dark" : "light";
      if (localStorage.getItem("chakra-ui-color-mode") !== mode) {
        localStorage.setItem("chakra-ui-color-mode", mode);
      }
      setColorMode(mode); // ✅ visuele update
    };

    media.addEventListener("change", sync);
    sync(); // initial sync

    return () => media.removeEventListener("change", sync);
  }, [setColorMode]);
};
