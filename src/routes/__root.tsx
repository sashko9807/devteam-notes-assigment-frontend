import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
  useRouter,
} from "@tanstack/react-router";
import { AppNavbar } from "../components/nav/AppNavbar";
import { Box } from "@mui/material";
import { QueryClient } from "@tanstack/react-query";

import { DehydrateRouter, Meta } from "@tanstack/react-router-server";
import { TAuthStore } from "../common/stores/authStore";
import { useEffect } from "react";
import React from "react";

function getTitle(title: string, suffix = "Note App") {
  if (title) {
    return `${title} | ${suffix}`;
  }
  return suffix;
}

function RootComponent() {
  const router = useRouter();

  return (
    <html lang="en">
      <head
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: router.options.context.head,
        }}
      ></head>

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
