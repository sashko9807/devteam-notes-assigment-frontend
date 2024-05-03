import * as React from "react";
import ReactDOM from "react-dom/client";

import { StartClient } from "@tanstack/react-router-server/client";
import { createRouter } from "./router";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "./common/createEmotionCache";
import theme from "./common/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter();

const cache = createEmotionCache();
const queryClient = new QueryClient();

function App() {
  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StartClient router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

ReactDOM.hydrateRoot(document, <App />);
