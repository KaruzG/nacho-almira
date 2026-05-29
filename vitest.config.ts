import { defineConfig } from "vitest/config";
import { loadEnvConfig } from "@next/env";

// Load Next.js environment variables (loads .env, .env.local, etc.)
loadEnvConfig(process.cwd());

export default defineConfig({
  test: {
    environment: "node",
  },
});
