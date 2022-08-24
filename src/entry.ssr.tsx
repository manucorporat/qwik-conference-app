import { renderToString } from "@builder.io/qwik-react";
import { renderToStream, RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";

/**
 * Server-Side Render method to be called by a server.
 */
export default function (opts: RenderToStreamOptions) {
  // Render the Root component to a string
  // Pass in the manifest that was generated from the client build
  const url = (opts.envData?.url as string) ?? "";
  const isReact = url.includes("qwik-react");
  if (isReact) {
    return renderToString(<Root />, {
      manifest,
      ...opts,
    });
  }
  return renderToStream(<Root />, {
    manifest,
    streaming: {
      inOrder: {
        strategy: "auto",
        initialChunkSize: 0,
        minimunChunkSize: 0,
      },
    },
    ...opts,
  });
}
