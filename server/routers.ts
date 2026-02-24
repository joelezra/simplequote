import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { addWaitlistSignup, getWaitlistCount } from "./db";
import { z } from "zod";

const TRADE_TYPES = [
  "Plumbing",
  "Electrical",
  "HVAC",
  "Painting",
  "Carpentry",
  "Roofing",
  "Handyman",
  "General Contracting",
  "Other",
] as const;

export const appRouter = router({
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

  waitlist: router({
    signup: publicProcedure
      .input(
        z.object({
          email: z.string().email("Please enter a valid email address"),
          tradeType: z.enum(TRADE_TYPES),
        })
      )
      .mutation(async ({ input }) => {
        const result = await addWaitlistSignup(input.email, input.tradeType);
        if (result.alreadyExists) {
          return {
            success: false,
            message: "This email is already on the waitlist!",
          };
        }
        return {
          success: true,
          message: "You're on the list! We'll be in touch soon.",
        };
      }),

    count: publicProcedure.query(async () => {
      const count = await getWaitlistCount();
      return { count };
    }),
  }),
});

export type AppRouter = typeof appRouter;
