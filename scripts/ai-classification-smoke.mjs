import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";

const client = createTRPCProxyClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      transformer: superjson,
    }),
  ],
});

const result = await client.classification.classify.mutate({
  title: "Fluoride contamination in village hand pumps",
  description: "Several families depend on hand pumps with high fluoride levels, and children show signs of dental fluorosis.",
});

console.log(JSON.stringify(result));
