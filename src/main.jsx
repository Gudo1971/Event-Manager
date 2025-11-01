// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";
import { EventsProvider } from "./context/EventsContext"; // ✅ importeer context
import "react-datepicker/dist/react-datepicker.css";
import { AboutUs } from "./pages/AboutUs";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./components/ui/theme";
import { useColorMode } from "@chakra-ui/react";

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
      <DebugColorMode />
      <Provider>
        <EventsProvider>
          <RouterProvider router={router} />
        </EventsProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
