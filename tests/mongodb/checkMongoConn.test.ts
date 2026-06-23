import { describe, it, expect, afterAll } from "vitest";
import { z } from "zod";
import dbConnect from "../../lib/db/mongoose";
import mongoose from "mongoose";

afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }
});

describe("MongoDB Connection", () => {
    it("Should validate MONGODB connection", async () => {
        const mongoUriSchema = z.string().startsWith("mongodb");
        const result = mongoUriSchema.safeParse(process.env.MONGODB_URI);
        expect(result.success, result.error?.message).toBe(true);

        try {
            const conn = await dbConnect();
            expect(conn.connection.readyState).toBe(1);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            throw new Error(`\n❌ Error de conexión a MongoDB: ${errorMessage}\n(Revisa si es 'bad auth' u otro problema de credenciales)`);
        }
    });
});