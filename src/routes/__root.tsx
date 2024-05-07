import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
  useRouter,
  useRouterState,
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
  const router = useRouter();

  const routerState = useRouterState();
  const meta = routerState.matches[1]?.staticData;
  const pageTitle = getTitle(meta?.title);

  return (
    <html lang="en">
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content={meta.description ?? pageTitle} />
        <meta
          name="og:description"
          content={meta.metaDescription ?? pageTitle}
        />
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
        <script type="module" src={router.options.context.scriptSrc} />
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
  scriptSrc: string;
}>()({
  component: RootComponent,
  staticData: {
    title: "",
    metaTitle: "",
    description: "",
    metaDescription: "",
  },
});
