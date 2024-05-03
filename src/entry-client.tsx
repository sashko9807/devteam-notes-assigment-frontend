import * as React from "react";
import ReactDOM from "react-dom/client";

import { StartClient } from "@tanstack/react-router-server/client";
import { createRouter } from "./router";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createEmotionCache from "./common/createEmotionCache";
import theme from "./common/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createRouter();

let root: ReturnType<typeof ReactDOM.createRoot>;
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

router.hydrate();
React.startTransition(() => {
  root = ReactDOM.hydrateRoot(document, <App />);

  if (root) {
    //
  }
});

// This is a workaround for react hydration completely barfing when
// browser extensions mutate the DOM before hydration
// This is a temporary solution until React fixes this issue
// const checker = setInterval(() => {
//   if (!document.documentElement) {
//     console.warn(
//       "We detected that browser extensions mutated the DOM before hydration and caused some hydration errors. Falling back to client-side rendering."
//     );
//     clearInterval(checker);
//     clearTimeout(checkedOut);
//     // const htmlEl = document.createElement('html')
//     // htmlEl.innerHTML = '<head></head><body></body>'
//     // document.replaceChildren(htmlEl)
//     root.render(<App />);
//   }
// }, 1);

// const checkedOut = setTimeout(() => {
//   clearInterval(checker);
// }, 1000);
