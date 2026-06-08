import { describe, it, expect } from "vitest";
import { z } from "zod";

describe("Environment Variables Validation", () => {
  it("Should validate all required environment variables", () => {
    const requiredEnv = z.object({
      ADMIN_EMAIL: z.email(),
      AUTH_GOOGLE_ID: z.string(),
      AUTH_GOOGLE_SECRET: z.string(),
      CLOUDINARY_CLOUD_NAME: z.string(),
      CLOUDINARY_API_KEY: z.string(),
      CLOUDINARY_API_SECRET: z.string(),
      MONGODB_URI: z.string(),
    });

    const env = requiredEnv.safeParse(process.env);

    expect(env.success, env.error?.message).toBe(true);
  });
});