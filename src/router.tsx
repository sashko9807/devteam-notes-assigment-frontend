import {
  AnyRouter,
  createRouter as createReactRouter,
} from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import SuperJSON from "superjson";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";

export function createRouter() {
  const queryClient = new QueryClient();
  const router: AnyRouter = createReactRouter({
    routeTree,
    context: {
      queryClient,
      auth: {
        accessToken: "",
        isAuthenticated: false,
      },
      scriptSrc: "",
      head: "",
    },
    dehydrate: () => {
      return {
        head: router.options.context.head,
        scriptSrc: router.options.context.scriptSrc,
        accessToken: router.options.context.auth.accessToken,
        isAuthenticated: router.options.context.auth.isAuthenticated,
        queryClientState: dehydrate(queryClient),
      };
    },
    hydrate: (data) => {
      router.options.context.scriptSrc = data.scriptSrc;
      router.options.context.head = data.head;
      router.options.context.auth.accessToken = data.accessToken;
      router.options.context.auth.isAuthenticated = data.isAuthenticated;
      hydrate(queryClient, data.queryClientState);
    },
    Wrap({ children }) {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );
    },
    transformer: SuperJSON,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
  interface StaticDataRouteOption {
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
  }
}
