import { VStack, Button } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Events", path: "/" },
    { label: "About Us", path: "/aboutUs" },
    // Voeg hier andere routes toe indien nodig
  ];

  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "#3182ce" : "inherit",
    textAlign: "left",
    width: "100%",
    justifyContent: "flex-start",
  });

  return (
    <VStack align="stretch" spacing={2}>
      {navItems
        .filter((item) => item.path !== currentPath)
        .map((item) => (
          <Button
            key={item.path}
            as={NavLink}
            to={item.path}
            variant="ghost"
            sx={linkStyle}
          >
            {item.label}
          </Button>
        ))}
    </VStack>
  );
};
