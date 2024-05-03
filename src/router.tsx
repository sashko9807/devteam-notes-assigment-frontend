import { createRouter as createReactRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import SuperJSON from "superjson";
import { QueryClient } from "@tanstack/react-query";

export function createRouter() {
  const queryClient = new QueryClient();
  return createReactRouter({
    routeTree,
    context: {
      queryClient,
      auth: undefined!,
      head: "",
    },
    defaultPreload: "intent",
    transformer: SuperJSON,
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
