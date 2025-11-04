import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { EventsProvider } from "./context/EventsContext";
import "react-datepicker/dist/react-datepicker.css";
import { AboutUs } from "./pages/AboutUs";
import { ChakraProvider, Box, useColorMode } from "@chakra-ui/react";
import { theme } from "./components/ui/theme";

const DebugColorMode = () => {
  const { colorMode } = useColorMode();
  console.log("Current color mode:", colorMode);
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <EventsPage /> },
      { path: "/event/:eventId", element: <EventPage /> },
      { path: "/events", element: <EventsPage /> },
      { path: "/AboutUs", element: <AboutUs /> },
    ],
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Box minHeight="100vh" width="100%" overflowX="hidden">
        <DebugColorMode />
        <Provider>
          <EventsProvider>
            <RouterProvider router={router} />
          </EventsProvider>
        </Provider>
      </Box>
    </ChakraProvider>
  </React.StrictMode>
);
