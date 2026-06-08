import { describe, it, expect } from "vitest";
import { v2 as cloudinary } from "cloudinary";

describe("Cloudinary Connection", () => {
  it("Should validate Cloudinary connection", async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
        const result = await cloudinary.api.ping();
        expect(result.status).toBe("ok");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        throw new Error(`\n❌ Error de autenticación en Cloudinary: ${errorMessage}`);
    }
  })
})