// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Root } from "./components/Root";
import { EventsPage } from "./pages/EventsPage";
import { EventPage } from "./pages/EventPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <EventsPage /> },
      { path: "/event/:eventId", element: <EventPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
