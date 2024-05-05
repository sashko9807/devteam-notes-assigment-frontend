import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
} from "@tanstack/react-router";
import { AppNavbar } from "../components/nav/AppNavbar";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";

import { DehydrateRouter } from "@tanstack/react-router-server";
import { TAuthStore } from "../common/stores/authStore";

function getTitle(title: string, suffix = "Note App") {
  if (title) {
    return `${title} | ${suffix}`;
  }
  return suffix;
}

function RootComponent() {
  const matches = useMatches();
  const { title, description } = matches[1].staticData;
  const pageTitle = getTitle(title);

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content={description ?? pageTitle} />
        <meta name="og:description" content={description ?? pageTitle} />

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
  auth: Omit<TAuthStore, "login">;
  head: string;
}>()({
  component: RootComponent,
  staticData: {
    title: "Note App - Manage your own notes",
    description: "Note App is web application, helping you to manage notes",
  },
});
