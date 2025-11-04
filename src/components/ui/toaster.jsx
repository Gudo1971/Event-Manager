// src/components/ui/toaster.jsx
import {
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  Toaster as ChakraToaster,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "top-right",
  variant: "solid",
  pauseOnPageIdle: true,
  duration: 4000, // ⏱️ standaardduur voor non-loading toasts
  defaultOptions: {
    closable: true,
  },
});

export const Toaster = () => (
  <Portal>
    <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
      {(toast) => (
        <Toast.Root
          width={{ md: "sm" }}
          bg={toast.type === "loading" ? "gray.700" : undefined}
        >
          {toast.type === "loading" ? (
            <Spinner size="sm" color="blue.500" />
          ) : (
            <Toast.Indicator />
          )}
          <Stack gap="1" flex="1" maxWidth="100%">
            {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
            {toast.description && (
              <Toast.Description>{toast.description}</Toast.Description>
            )}
          </Stack>
          {toast.action && (
            <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
          )}
          {toast.closable && <Toast.CloseTrigger />}
        </Toast.Root>
      )}
    </ChakraToaster>
  </Portal>
);
