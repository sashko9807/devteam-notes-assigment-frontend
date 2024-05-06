import { Transform } from "stream";
import createEmotionServer from "@emotion/server/create-instance";
import { EmotionCache } from "@emotion/react";
import { AnyRouteMatch, StaticDataRouteOption } from "@tanstack/react-router";
import { generateTitle } from "./generateTitle";

const textDecoder = new TextDecoder();

export function transformStreamWithEmotion(cache: EmotionCache) {
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache);
  return new Transform({
    transform(chunk, _encoding, callback) {
      const chunkString = textDecoder.decode(chunk);

      const html = textDecoder.decode(chunk);
      const chunks = extractCriticalToChunks(html);
      const emotionCss = constructStyleTagsFromChunks(chunks);

      chunkString.replace(
        '<meta name="emotion-insertion-point" content=""/>',
        emotionCss
      );

      callback(null, chunkString);
    },
  });
}

export function transformStreamWithDynamicMetadata(matches: AnyRouteMatch[]) {
  const { title, description, metaTitle, metaDescription } = matches[1]
    .staticData as StaticDataRouteOption;
  return new Transform({
    transform(chunk, _encoding, callback) {
      let chunkString = textDecoder.decode(chunk);

      chunkString = chunkString.replace("{{pageTitle}}", generateTitle(title));
      chunkString = chunkString.replace("{{metaTitle}}", metaTitle);
      chunkString = chunkString.replace("{{description}}", description);
      chunkString = chunkString.replace("{{metaDescription}}", metaDescription);

      callback(null, chunkString);
    },
  });
}
