import * as React from "react";
import ReactDOM from "react-dom/client";

import { StartClient } from "@tanstack/react-router-server/client";
import { createRouter } from "./router";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "./common/createEmotionCache";
import theme from "./common/theme";
import { AuthStoreProviders } from "./components/auth/AuthStoreProvider";

const router = createRouter();
const cache = createEmotionCache();

function App() {
  return (
    <AuthStoreProviders
      init={{
        accessToken: router.options.context.auth.accessToken,
        isAuthenticated: router.options.context.auth.isAuthenticated,
      }}
    >
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <StartClient router={router} />
        </ThemeProvider>
      </CacheProvider>
    </AuthStoreProviders>
  );
}

router.hydrate();
ReactDOM.hydrateRoot(document, <App />);
