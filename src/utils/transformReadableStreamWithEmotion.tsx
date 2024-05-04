import { Transform } from "stream";
import createEmotionServer from "@emotion/server/create-instance";
import { EmotionCache } from "@emotion/react";

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
