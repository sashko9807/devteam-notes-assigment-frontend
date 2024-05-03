import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AppNavbar } from "../components/nav/AppNavbar";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";
import { AuthStore } from "../common/stores/authStore";
import { DehydrateRouter } from "@tanstack/react-router-server";

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite App</title>
        <script
          type="module"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              import RefreshRuntime from "/@react-refresh"
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true
            `,
          }}
        />
        <meta name="emotion-insertion-point" content="" />
        <script type="module" src="/@vite/client" />
        <script type="module" src="/src/entry-client.tsx" />
      </head>
      <body>
        <header>
          <AppNavbar />
        </header>
        <Box sx={{ marginTop: 10 }} component={"main"}>
          <Outlet />
        </Box>
        <DehydrateRouter />
      </body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthStore;
  head: string;
}>()({
  component: RootComponent,
});
