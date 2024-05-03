import * as React from "react";
import ReactDOMServer, { PipeableStream } from "react-dom/server";
import { createMemoryHistory } from "@tanstack/react-router";
import {
  StartServer,
  transformStreamWithRouter,
} from "@tanstack/react-router-server/server";
import { isbot } from "isbot";
import { ServerResponse } from "http";
import express from "express";

// index.js
import "./fetch-polyfill";
import { createRouter } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CacheProvider, ThemeProvider } from "@emotion/react";
import theme from "./common/theme";
import createEmotionCache from "./common/createEmotionCache";

type ReactReadableStream = ReadableStream<Uint8Array> & {
  allReady?: Promise<void> | undefined;
};

export async function render(opts: {
  url: string;
  head: string;
  req: express.Request;
  res: ServerResponse;
}) {
  const router = createRouter();
  const queryClient = new QueryClient();
  const cache = createEmotionCache();

  const memoryHistory = createMemoryHistory({
    initialEntries: [opts.url],
  });

  // Update the history and context
  router.update({
    history: memoryHistory,
    context: {
      queryClient: queryClient,
      auth: undefined!,
      head: opts.head,
    },
  });

  // Wait for the router to load critical data
  // (streamed data will continue to load in the background)
  await router.load();

  // Track errors
  let statusCode = 200;

  // Clever way to get the right callback. Thanks Remix!
  const callbackName = isbot(opts.req.headers["user-agent"])
    ? "onAllReady"
    : "onShellReady";

  // Render the app to a readable stream
  let stream!: PipeableStream;

  await new Promise<void>((resolve) => {
    stream = ReactDOMServer.renderToPipeableStream(
      <CacheProvider value={cache}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <StartServer router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </CacheProvider>,
      {
        [callbackName]: () => {
          resolve();
        },
        onError: (err) => {
          statusCode = 500;
          console.log(err);
        },
      }
    );
  });

  if (router.hasNotFoundMatch() && statusCode !== 500) statusCode = 404;

  opts.res.statusCode = statusCode;
  opts.res.setHeader("Content-Type", "text/html");

  // Add our Router transform to the stream
  const transforms = [transformStreamWithRouter(router)];

  const transformedStream = transforms.reduce(
    (stream, transform) => stream.pipe(transform as any),
    stream
  );

  transformedStream.pipe(opts.res);
}
