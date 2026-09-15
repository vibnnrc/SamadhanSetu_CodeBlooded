import express, { type Express } from "express";
import type { Server } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

type CreateAppOptions = {
  developmentServer?: Server;
  serveStaticFiles?: boolean;
};

export async function createApp(options: CreateAppOptions = {}): Promise<Express> {
  const app = express();

  // Preserve the existing upload limits used by supporting evidence workflows.
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  if (process.env.NODE_ENV === "development" && options.developmentServer) {
    await setupVite(app, options.developmentServer);
  } else if (options.serveStaticFiles !== false) {
    serveStatic(app);
  }

  return app;
}
