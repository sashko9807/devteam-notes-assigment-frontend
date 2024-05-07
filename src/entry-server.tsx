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

import { CacheProvider, ThemeProvider } from "@emotion/react";
import theme from "./common/theme";
import createEmotionCache from "./common/createEmotionCache";
import { transformStreamWithEmotion } from "./utils/transformReadableStreamWithEmotion";

import { apiClient } from "./api/apiClient";
import { endpoints } from "./common/apiEndpoints";

import { AuthStoreProviders } from "./components/auth/AuthStoreProvider";
import { CssBaseline } from "@mui/material";

export async function render(opts: {
  url: string;
  head: string;
  req: express.Request;
  res: ServerResponse;
}) {
  const router = createRouter();
  let scriptSrc = "";
  if (process.env.NODE_ENV !== "production") {
    scriptSrc = "/src/entry-client.tsx";
  } else {
    //Hacky solution for getting src of production code
    const scriptsRegex = /<script\b[^>]*>[\s\S]*?<\/script\b[^>]*>/g;
    const templateScript = opts.head.match(scriptsRegex);
    if (templateScript) {
      scriptSrc = templateScript[0].substring(
        templateScript[0].indexOf('src="') + 5,
        templateScript[0].indexOf('">')
      );
    }
  }
  const cache = createEmotionCache();
  const cookies = opts.req.cookies;
  const refreshToken = cookies?.jwt;
  const memoryHistory = createMemoryHistory({
    initialEntries: [opts.url],
  });

  const authContext = {
    auth: {
      isAuthenticated: false,
      accessToken: "",
    },
  };
  if (refreshToken) {
    const accessTokenRes = await apiClient.post(
      endpoints.auth.refresh.url,
      undefined,
      {
        headers: { Cookie: `jwt=${refreshToken}` },
        withCredentials: true,
      }
    );
    authContext.auth.accessToken = accessTokenRes?.data?.accessToken ?? "";
  }
  // Update the history and context
  router.update({
    history: memoryHistory,
    context: {
      queryClient: router.options.context.queryClient,
      auth: {
        isAuthenticated: refreshToken ? true : false,
        accessToken: authContext.auth.accessToken,
      },

      head: opts.head,
      scriptSrc: scriptSrc,
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
      <AuthStoreProviders
        init={{
          isAuthenticated: router.options.context.auth.isAuthenticated,
          accessToken: router.options.context.auth.accessToken,
        }}
      >
        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <StartServer router={router} />
            <CssBaseline />
          </ThemeProvider>
        </CacheProvider>
      </AuthStoreProviders>,
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
  const transforms = [
    transformStreamWithRouter(router),
    transformStreamWithEmotion(cache),
  ];

  const transformedStream = transforms.reduce(
    (stream, transform) => stream.pipe(transform as any),
    stream
  );

  transformedStream.pipe(opts.res);
}
