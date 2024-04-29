import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@emotion/react";
import theme from "./common/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccessToken, useAuth } from "./common/stores/authStore";

// Create a new router instance
const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined! },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <InnerApp />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
