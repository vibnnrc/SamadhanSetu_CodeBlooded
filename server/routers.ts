import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { classifyCivicReport } from "./reportClassification";
import { draftProposalWithAI, summarizeForModeration, uploadSupportingEvidence } from "./collaborationFeatures";
import { createNotificationForAll, listNotificationsForUser, markNotificationsReadForUser } from "./db";
import { buildNewProblemNotification } from "./notificationFeatures";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  classification: router({
    classify: publicProcedure
      .input(z.object({
        title: z.string().trim().min(6).max(180),
        description: z.string().trim().min(20).max(3000),
      }))
      .mutation(async ({ input }) => classifyCivicReport(input)),
  }),

  collaboration: router({
    draftProposal: publicProcedure.input(z.object({
      problemTitle: z.string().trim().min(6).max(180),
      problemDescription: z.string().trim().min(20).max(3000),
      district: z.string().trim().min(2).max(80),
    })).mutation(({ input }) => draftProposalWithAI(input)),
    moderationSummary: publicProcedure.input(z.object({
      title: z.string().trim().min(6).max(180),
      description: z.string().trim().min(20).max(3000),
      district: z.string().trim().min(2).max(80),
      category: z.string().trim().min(2).max(80),
      urgency: z.string().trim().min(2).max(40),
    })).mutation(({ input }) => summarizeForModeration(input)),
  }),

  notifications: router({
    list: protectedProcedure.query(({ ctx }) => listNotificationsForUser(ctx.user.id)),
    markAllRead: protectedProcedure.mutation(({ ctx }) => markNotificationsReadForUser(ctx.user.id)),
    broadcastNewProblem: publicProcedure.input(z.object({
      problemId: z.union([z.string(), z.number()]).transform(String),
      title: z.string().trim().min(6).max(180),
      district: z.string().trim().min(2).max(80),
    })).mutation(({ input }) => createNotificationForAll(buildNewProblemNotification(input))),
  }),

  evidence: router({
    upload: publicProcedure.input(z.object({
      fileName: z.string().trim().min(1).max(180),
      mimeType: z.string().trim().min(3).max(120),
      base64: z.string().min(4).max(11_200_000),
    })).mutation(({ input }) => uploadSupportingEvidence(input)),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
