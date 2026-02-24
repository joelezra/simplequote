import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => {
  let signups: Map<string, string> = new Map();

  return {
    addWaitlistSignup: vi.fn(async (email: string, tradeType: string) => {
      if (signups.has(email)) {
        return { success: false, alreadyExists: true };
      }
      signups.set(email, tradeType);
      return { success: true, alreadyExists: false };
    }),
    getWaitlistCount: vi.fn(async () => {
      return signups.size;
    }),
    // Expose reset for tests
    _resetSignups: () => {
      signups = new Map();
    },
    // Keep other exports
    upsertUser: vi.fn(),
    getUserByOpenId: vi.fn(),
    getDb: vi.fn(),
  };
});

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("waitlist.signup", () => {
  beforeEach(async () => {
    const db = await import("./db");
    (db as any)._resetSignups();
    vi.clearAllMocks();
  });

  it("successfully signs up a new email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.waitlist.signup({
      email: "plumber@example.com",
      tradeType: "Plumbing",
    });

    expect(result).toEqual({
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    });
  });

  it("returns already exists for duplicate email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // First signup
    await caller.waitlist.signup({
      email: "plumber@example.com",
      tradeType: "Plumbing",
    });

    // Duplicate signup
    const result = await caller.waitlist.signup({
      email: "plumber@example.com",
      tradeType: "Electrical",
    });

    expect(result).toEqual({
      success: false,
      message: "This email is already on the waitlist!",
    });
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.signup({
        email: "not-an-email",
        tradeType: "Plumbing",
      })
    ).rejects.toThrow();
  });

  it("rejects invalid trade type", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.waitlist.signup({
        email: "valid@example.com",
        tradeType: "InvalidTrade" as any,
      })
    ).rejects.toThrow();
  });

  it("accepts all valid trade types", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const tradeTypes = [
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

    for (const trade of tradeTypes) {
      const result = await caller.waitlist.signup({
        email: `${trade.toLowerCase().replace(/\s/g, "")}@example.com`,
        tradeType: trade,
      });
      expect(result.success).toBe(true);
    }
  });
});

describe("waitlist.count", () => {
  beforeEach(async () => {
    const db = await import("./db");
    (db as any)._resetSignups();
    vi.clearAllMocks();
  });

  it("returns 0 when no signups exist", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.waitlist.count();
    expect(result).toEqual({ count: 0 });
  });

  it("returns correct count after signups", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.waitlist.signup({
      email: "first@example.com",
      tradeType: "Plumbing",
    });
    await caller.waitlist.signup({
      email: "second@example.com",
      tradeType: "Electrical",
    });

    const result = await caller.waitlist.count();
    expect(result).toEqual({ count: 2 });
  });

  it("does not count duplicate signups", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await caller.waitlist.signup({
      email: "same@example.com",
      tradeType: "Plumbing",
    });
    await caller.waitlist.signup({
      email: "same@example.com",
      tradeType: "Electrical",
    });

    const result = await caller.waitlist.count();
    expect(result).toEqual({ count: 1 });
  });
});
